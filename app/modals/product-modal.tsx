import { React } from "React"

import type { Product } from "../products";

export default function ProductModal({product}): {product: Product} {
    return (
        <div key={product.id} className="w-full h-full p-3 shadow rounded text-xs font-normal flex flex-col">
            <img className="w-full aspect-square mb-2" src={product.images[0] ?? ""} alt={`Product ${product.title}`} />
            <p className="w-full mb-2">{product.title}</p>
            <p className="w-full mb-3 text-gray-700">${product.price}</p>
            <button className="mt-auto w-full py-2 px-4 text-white uppercase bg-black font-thin">
                Add to cart
            </button>
        </div>
    );
}