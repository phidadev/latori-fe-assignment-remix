import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { createCookieSessionStorage, json } from "@remix-run/node";
import { addLineItem, removeLineItem } from "./utils/cart"
import { getProductById } from "./products";
import CartModal from "./modals/cart-modal";
import { useState } from "react";

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
];

export const loader = async ({
  params,
  request,
}) => {
  // create cookie session storage with cookie "cart" to save current cart state
  let storage = createCookieSessionStorage({
    cookie: {
      name: "cart",
    },
  });

  // get session
  let session = await storage.getSession(request.headers.get("cookie"));
  // get content of cookie "cart" to get existing cart
  let cart = session.get("cart") ?? null;
  // cart line items without purchasables
  const lineItems = cart?.lineItems ?? [];
  // array for the filled line items
  let filledLineItems = [];

  // check if line items exist
  if(lineItems.length) {
    // set filled line items with the fetched products
    filledLineItems = await Promise.all(lineItems.map(async (li) => {
      return {id: li.id, qty: li.qty, purchasable: await getProductById(li.id)}
    }));
  }
  
  // returns the filled line items
  return json({lineItems: filledLineItems});
};

export default function App() {
  // get loader data
  const loaderData = useLoaderData();
  // set line items from loader data
  const lineItems = loaderData.lineItems ?? [];

  // default visible state is false
  const [cartIsVisible, setCartIsVisible] = useState(false);

  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      {/* if show cart, lock background */}
      <body className={`${cartIsVisible ? "overflow-hidden":""}`}>
        <header className="sticky top-0 w-full bg-black px-4 py-4">
          <div className="w-full max-w-5xl mx-auto text-white text-sm md:text-lg font-normal flex justify-between">
            <Link to={"/"}>Product List</Link>
            {/* on click show the cart / set the visibility to true */}
            <button onClick={() => setCartIsVisible(true)}>Open Cart</button>
          </div>
        </header>
        <div id="main">
          {/* route content */}
          <Outlet />
        </div>
        {/* Global CartModal include */}
        <CartModal key={"cart"} isVisible={cartIsVisible} onHide={() => setCartIsVisible(false)} lineItems={lineItems} />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// Root Action
export const action = async ({
  request,
}) => {
  // create cookie session storage with cookie "cart" to save current cart state
  let storage = createCookieSessionStorage({
    cookie: {
      name: "cart",
    },
  });

  // get session
  let session = await storage.getSession(request.headers.get("cookie"));
  // get content of cookie "cart" to get existing cart
  let cart = session.get("cart") ?? null;
  
  // get form data
  const rawFormData = await request.formData();
  // form data to object
  const formData = Object.fromEntries(rawFormData);
  // get intent from form data
  const intent = formData.intent;

  // decide which case matches for intent
  switch(intent) {
    // add to cart logic
    case "add-to-cart": {
      // get product id from form data
      const productId = formData.productId;
      // only add product if product id exists
      if(productId != null) {
        // add line item to cart
        cart = addLineItem(cart, Number(productId));
        // set session cookie cart to updated cart
        session.set("cart", cart);
        
        // answer with response and set cookie header to update cart cookie
        return new Response("", {
          headers: {
            "Set-Cookie": await storage.commitSession(session),
          }
        })
      }
    }break;

    case "remove-line-item": {
      // get line item id from form data
      const lineItemId = formData.lineItemId;
      // only remove line item if line item id exists
      if(lineItemId != null) {
        // remove line item from cart
        cart = removeLineItem(cart, Number(lineItemId));
        // set session cookie cart to updated cart
        session.set("cart", cart);
        
        // answer with response and set cookie header to update cart cookie
        return new Response("", {
          headers: {
            "Set-Cookie": await storage.commitSession(session),
          }
        })
      }
    }break;
  }

  // can't handle action return ok=false
  return json({ok: false});   
}