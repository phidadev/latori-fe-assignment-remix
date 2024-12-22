import type { LineItem } from "../utils/cart";
import LineItemModal from "./lineItem-modal";

export default function CartModal({
    isVisible,
    onHide,
    lineItems,
}: {
    isVisible: boolean,
    onHide: () => void,
    lineItems: LineItem[]
}) {
    return (
        <div className={`${!isVisible ? "hidden ":""}fixed z-30 inset-0 w-full h-full flex justify-center items-center`}>
            <div onClick={onHide} className="absolute inset-0 w-full h-full bg-black/[0.4]"></div>
            <div className="relative max-w-3xl w-full h-full max-h-[50%] px-3 pb-3 bg-white text-black rounded shadow overflow-scroll flex flex-col">
                <div className="sticky top-0 w-full py-4 border-b border-black flex justify-between items-center gap-8 bg-white">
                    <p>Cart</p>
                    <button onClick={onHide}>
                        X
                    </button>
                </div>
                <div className="w-full h-auto py-4 flex flex-col gap-3">
                    {lineItems.length ? lineItems.map(li => (
                        <LineItemModal key={li.id} lineItem={li} />
                    ))
                    :(
                        <p className="mx-auto my-12 italic">Cart is empty</p>
                    )}
                </div>
            </div>
        </div>
    );
}