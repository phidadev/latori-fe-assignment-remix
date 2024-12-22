export type Product = {
    id: number,
    title: string,
    images: string[],
    price: number,
}

const products = {
    async getProductPage(page: number = 1, itemsPerPage: number = 1): Promise<Product[]> {
        const offset = (page - 1) * itemsPerPage;
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${itemsPerPage}`);
        const products = response.json();
        return products;
    }
};

export async function getProducts(page: number, itemsPerPage: number): Promise<Product[]> {
    return products.getProductPage(page, itemsPerPage);
}