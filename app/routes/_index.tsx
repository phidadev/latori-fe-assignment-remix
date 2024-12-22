import { React } from "React"
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getProducts } from "../products";
import { useLoaderData } from "@remix-run/react";
import ProductModal from "../modals/product-modal";

export const loader = async ({
    params,
    request
}: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") ?? 1;
    const itemsPerPage = 6;
    const products = await getProducts(Number(page), itemsPerPage);

    return json({products: products});
}

export default function Index() {
    const loaderData = useLoaderData<typeof loader>();
    const products = loaderData.products ?? [];
    
    return (
        <div className="w-full px-4">
            <div className="w-full max-w-5xl mx-auto py-4 grid grid-cols-3 gap-x-5 gap-y-3">
                {products.map(p => (
                    <ProductModal key={p.id} product={p}/>
                ))}
            </div>
        </div>
    );
}