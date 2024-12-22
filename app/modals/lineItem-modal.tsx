import { useFetcher } from "@remix-run/react";
import type { LineItem } from "../utils/cart";

export default function LineItemModal({
    lineItem,
}: {lineItem: LineItem}) {
    const purchasable = lineItem.purchasable ?? null;
    if(purchasable == null) return null;
    
    const fetcher = useFetcher();
    const isLoading = fetcher.state == "loading";

    return (
        <div className="w-full flex items-stretch gap-4">
            <img className="w-20 h-auto shrink-0 self-start aspect-square object-cover object-center" src={purchasable.images[0] ?? ""} alt={`Product ${purchasable.title}`} />
            <div className="w-full h-auto flex flex-col gap-3 justify-between text-black text-sm font-light">
                <p>{purchasable.title}</p>
                <p>${purchasable.price}</p>
                <p>Qty: {lineItem.qty}</p>
            </div>
            <fetcher.Form method="post" action="/" className="w-max h-max shrink-0 my-auto">
                <input type="hidden" name="intent" value="remove-line-item" />
                <input type="hidden" name="lineItemId" value={lineItem.id} />
                <button type="submit" className="mt-auto w-28 py-2 px-4 text-white bg-black text-sm font-light">
                    {isLoading ? "Removing...":"Remove"}
                </button>
            </fetcher.Form>
        </div>
    );
}