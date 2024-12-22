import { Product } from "../products"

// create new type LineItem to store products in the cart
export type LineItem = {
    id: number,
    qty: number,
    purchasable?: Product,
};

// create new type Cart to store cart specific data
export type Cart = {
    lineItems: LineItem[];
}

// adds a lineitem to the cart and returns the cart
export function addLineItem(cart: Cart, productId: number): Cart {
    // if cart not exists, create a new one
    if(cart == null) cart = getNewCart();
    
    let lineItems = cart.lineItems ?? null;
    // if lineItems is null, create an empty array
    if(lineItems === null) cart.lineItems = [];

    // get the lineItem index if product already exists in cart
    let lineItemIndex = cart.lineItems.findIndex(li => li.id == productId);

    // check if product exists in cart
    if(lineItemIndex !== -1) {
        // add one quantity if product exists
        cart.lineItems[lineItemIndex].qty++;
    } else {
        // add a new lineItem with quantity 1
        const newLineItem: LineItem = {id: productId, qty: 1};
        cart.lineItems.push(newLineItem);
    }

    return cart;
}

// creates a new empty cart and returns it
export function getNewCart(): Cart {
    return {
        lineItems: [],
    };
}