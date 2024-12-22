import { React, useState } from "react"
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getProducts, Product } from "../products";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ProductModal from "../modals/product-modal";

export const loader = async ({
    params,
    request
}: LoaderFunctionArgs) => {
    // create url object from request url
    const url = new URL(request.url);
    // get search param "page", 1 default
    const page = url.searchParams.get("page") ?? 1;
    // set items per page
    const itemsPerPage = 6;
    // use products function to get products by page and itemsPerPage
    const products = await getProducts(Number(page), itemsPerPage);

    // return products, the current page and if there is a next page
    return json({products: products, page: page, hasNextPage: products.length === itemsPerPage});
}

export default function Index() {
    // get fetcher
    const fetcher = useFetcher<{page: number,products: Product[],hasNextPage: boolean}>();
    // get fetcher data
    const fetcherData = fetcher.data;
    // initial loader data for first load
    const initialLoaderData = useLoaderData<typeof loader>();

    // set loading of more more products; initial value false
    const [isLoading, setIsLoading] = useState(false); 
    // set loaderData var; initial value is initial loader data
    const [loaderData, setLoaderData] = useState(initialLoaderData);
    // set products from loader data
    const products = loaderData.products ?? [];
    // set page from loader data
    const page = Number(loaderData.page) ?? 1;
    // set hasNextPage from loader
    const hasNextPage = loaderData.hasNextPage ?? true;
    
    // check if fetcher data exists
    if(fetcherData != null) {
        // set new page if exists in new data
        const newPage = Number(fetcherData.page) ?? null;
        // set fetcher products if exists in new data
        const fetcherProducts = fetcherData.products ?? null;

        // check if fetcher products and new pages exists and new page is really new 
        if(fetcherProducts != null && newPage != null && newPage > page) {
            // filter new products
            const newProducts = fetcherProducts.filter(np => products.indexOf(np) == -1);
            
            // check if there are new products
            if(newProducts.length) {
                
                // set new loader data
                setLoaderData((oldLoaderData) => {
                    // set loading to false after setting new data
                    setIsLoading(false);
                    return {
                        // set products with old and new products
                        products: [...oldLoaderData.products,...newProducts],
                        // set old/new page
                        page: newPage,
                        // set new hasNextPage value
                        hasNextPage: fetcherData.hasNextPage ?? true,
                    };
                });
            }
        }
    }
    
    // function to handle load more
    const handleLoadMore = () => {
        // start loading
        setIsLoading(true);
        // load new data with next product page
        fetcher.load(`/?index&page=${page + 1}`);
    };

    return (
        <div className="w-full px-4 flex flex-col mb-12">
            <div className="w-full max-w-5xl mx-auto py-4 flex flex-col md:grid md:grid-cols-3 md:gap-x-5 gap-y-5 md:gap-y-3">
                {/* Map products to ProductModal view */}
                {products.map(p => (
                    <ProductModal key={`product-${p.id}`} product={p}/>
                ))}
            </div>
            {/* if there is a next page: show load-more-button; handle load more onclick */}
            {hasNextPage ? (
                <button onClick={() => handleLoadMore()} className="w-full mt-8 md:max-w-md mx-auto py-3 px-4 text-white text-xs md:text-lg uppercase bg-black font-light">
                    {/* show loading while loading */}
                    {isLoading ? "Loading...":"Load More"}
                </button>
            ):null}
        </div>
    );
}