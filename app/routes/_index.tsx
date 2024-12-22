import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getProducts } from "../products";
import { useLoaderData } from "@remix-run/react";

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
        <div>

        </div>
    );
}