import { useFetcher } from "@remix-run/react";
import type { LineItem } from "../utils/cart";

// LineItemModal to display a single line item
export default function LineItemModal({
    lineItem,
}: {lineItem: LineItem}) {
    const purchasable = lineItem.purchasable ?? null;
    // check if purchasable with the data exists, otherwise dont't render lineItem
    if(purchasable == null) return null;
    
    // fetcher for dynamic submitting and accessing date and state
    const fetcher = useFetcher();
    // access state for loading "animation"
    const isLoading = fetcher.state == "loading";

    return (
        <div className="w-full flex items-stretch gap-4">
            <img className="w-20 h-auto shrink-0 self-start aspect-square object-cover object-center" src={purchasable.images[0] ?? ""} alt={`Product ${purchasable.title}`} />
            <div className="w-full h-auto flex flex-col gap-2 justify-between text-black text-sm">
                <p>{purchasable.title}</p>
                <p>${purchasable.price}</p>
                <p>Qty: {lineItem.qty}</p>
            </div>
            {/* fetcher form for submitting data without page reload */}
            <fetcher.Form method="post" action="/" className="w-max h-max shrink-0 my-auto">
                {/* intent for the action function */}
                <input type="hidden" name="intent" value="remove-line-item" />
                {/* lineItemId to remove from the cart */}
                <input type="hidden" name="lineItemId" value={lineItem.id} />
                {/* button to submit form */}
                <button type="submit" disabled={isLoading} className="mt-auto w-28 py-2 px-4 text-white bg-black text-sm">
                    {/* update user if action is still in progress */}
                    {isLoading ? "Removing...":"Remove"}
                </button>
            </fetcher.Form>
        </div>
    );
}