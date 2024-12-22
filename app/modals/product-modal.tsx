import { React } from "React"

import type { Product } from "../products";
import { useFetcher } from "@remix-run/react";

// ProductModal to display a single product
export default function ProductModal({
    product,
}: {
    product: Product,
}) {
    // use fetcher for updating view
    const productFetcher = useFetcher();
    // check if fetcher is loading (adding product to cart)
    const isLoading = productFetcher.state == "loading";
    
    return (
        <div key={product.id} className="w-full h-full md:p-3 md:shadow md:rounded text-xs font-normal flex flex-row md:flex-col items-stretch md:items-start gap-x-2 md:gap-x-0">
            <img className="w-20 md:w-full self-start aspect-square object-cover object-center md:mb-2" src={product.images[0] ?? ""} alt={`Product ${product.title}`} />
            <div className="w-full mb-3">
                <p className="w-full mb-2">{product.title}</p>
                <p className="w-full text-gray-700">${product.price}</p>
            </div>
            {/* Fetcher Form to send data without reloading the page */}
            <productFetcher.Form method="post" action="/" className="ml-10 md:ml-0 mt-auto mb-auto md:mb-0 w-max md:w-full h-max">
                {/* intent for the action function */}
                <input type="hidden" name="intent" value="add-to-cart" />
                {/* product to add to the cart */}
                <input type="hidden" name="productId" value={product.id} />
                {/* button to submit form */}
                <button type="submit" className="w-24 md:w-full py-2 md:py-3 px-2 md:px-4 whitespace-nowrap text-white uppercase bg-black font-thin">
                    {/* update user if action is still in progress */}
                    {isLoading ? "Adding...":"Add to cart"}
                </button>
            </productFetcher.Form>
        </div>
    );
}