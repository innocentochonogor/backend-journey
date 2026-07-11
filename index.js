const jsonString = '{"product":"Laptop","price":1200,"inStock":true}';
const product = JSON.parse(jsonString);

let stockStatus = product.inStock ? "in stock" : "out of stock";

console.log(`The ${product.product} costs $${product.price} and is ${stockStatus}.`);
