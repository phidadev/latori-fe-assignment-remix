import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";
import styles from "./tailwind.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
];

export default function App() {
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
      <body>
        <header className="sticky top-0 w-full bg-black px-4 py-4">
          <div className="w-full max-w-5xl mx-auto text-white text-sm md:text-lg font-normal flex justify-between">
            <Link to={"/"}>Product List</Link>
            <Link to={"/"}>Open Cart</Link>
          </div>
        </header>
        <div id="main">
          <Outlet />
        </div>

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
  // get form data
  const rawFormData = await request.formData();
  // form data to object
  const formData = Object.fromEntries(rawFormData);
  // get intent from form data
  const intent = formData.intent;

  switch(intent) {
    // add to cart logic
    case "add-to-cart": {
      // get product id from form data
      const productId = formData.productId;
      
      return null;   
    }break;
  }
  return null;   
}