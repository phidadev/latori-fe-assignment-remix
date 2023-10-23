# Latori GmbH Frontend Assignment

Build the application described below, by cloning this repo and following the wireframes provided in `/wireframes`. Share a link to your repo when completed.

### Installation
You will need to be running Node v18.18.2

```sh
npm install
```

### Start Dev Server

```sh
npm run dev
```

## Assignment

Build out the navigation, products and cart features.

#### Notes
  - Follow the wireframes closely – but the exact design is up to you
  - Please use Tailwind to style your components
  - Comment your code as much as possible
  - You can use any third-party library, but try to focus as much as possible to browser (and Remix) native APIs

#### Navigation

"Open cart" should open the Cart Modal

#### Products Container
  - Pull 6 products at a time, and create a product component for each, with the following:
    - Product image (first one)
    - Product title
    - Product price
    - "Add to Cart" button
  - The product component must be styled following the structure provided in the wireframes
  - "Add to Cart" button should add that product with a quantity of 1
  - "Load More" button should retrieve the next 6 products and add them to the container
  
#### Cart Modal

Implement a custom cart solution that showcases the current state of the cart:
  - Should reflect the currently added products and their quantities
  - "Remove" button should remove that particular product from the Cart
  - The cart should be persistent and the products should remain in the cart upon page reload

### Querying the mock database
  Product list can be retrieved from `https://api.escuelajs.co/api/v1/products`, in order to be able to provide pagination, the following params can be used: `offset` and `limit`, for example `https://api.escuelajs.co/api/v1/products?offset=0&limit=10` will show you the very first 10 products of the very first page. Setting `offset=10` will show you the next 10 products – and so on.