// create new type "Product" to hold product data
export type Product = {
    id: number,
    title: string,
    images: string[],
    price: number,
}

// products service to serve products
const products = {
    // get product by page and itemsPerPage, returns promise with Product-Array
    async getProductPage(page: number = 1, itemsPerPage: number = 1): Promise<Product[]> {
        // calculate the offset for the query
        const offset = (page - 1) * itemsPerPage;
        // fetch products
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${itemsPerPage}`);
        // transform response data from json to products array
        const products = response.json();
        // returns the products
        return products;
    },
    // get product by id, returns promise with a single Product
    async getProductById(productId: number): Promise<Product> {
        // fetch product with productId
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
        // transform response data from json to product
        const product = response.json();
        // returns the product
        return product;
    }
};

// async function, "export" to import and use in other files
// get products by page and itemsPerPage, uses the products service
export async function getProducts(page: number, itemsPerPage: number): Promise<Product[]> {
    return products.getProductPage(page, itemsPerPage);
}

// async function, "export" to import and use in other files
// get product by id, uses the products service
export async function getProductById(productId: number) {
    return await products.getProductById(productId);
}