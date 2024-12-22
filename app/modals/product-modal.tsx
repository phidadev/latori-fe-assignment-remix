import { React } from "React"

import type { Product } from "../products";
import { useFetcher } from "@remix-run/react";

// ProductModal to display a single product
export default function ProductModal({
    product,
}): {
    product: Product,
} {
    // use fetcher for updating view
    const productFetcher = useFetcher();
    // check if fetcher is loading (adding product to cart)
    const isLoading = productFetcher.state == "loading";
    
    return (
        <div key={product.id} className="w-full h-full p-3 shadow rounded text-xs font-normal flex flex-col">
            <img className="w-full aspect-square mb-2" src={product.images[0] ?? ""} alt={`Product ${product.title}`} />
            <p className="w-full mb-2">{product.title}</p>
            <p className="w-full mb-3 text-gray-700">${product.price}</p>
            {/* Fetcher Form to send data without reloading the page */}
            <productFetcher.Form method="post" action="/">
                {/* intent for the action function */}
                <input type="hidden" name="intent" value="add-to-cart" />
                {/* product to add to the cart */}
                <input type="hidden" name="productId" value={product.id} />
                {/* button to submit form */}
                <button type="submit" className="mt-auto w-full py-2 px-4 text-white uppercase bg-black font-thin">
                    {/* update user if action is still in progress */}
                    {isLoading ? "Adding...":"Add to cart"}
                </button>
            </productFetcher.Form>
        </div>
    );
}