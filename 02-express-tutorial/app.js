// console.log('Express Tutorial')

const express = require("express");
const path = require("path");
const app = express();
const { products } = require("./data");

app.use(express.static("./public"));

app.get("/about", (req, res) => {
  res.send("<h1>about page</h1>");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  //   res.json(req.params);
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).send("<h1>product not found</h1>");
  }

  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, minPrice, maxPrice, regex } = req.query;
  let result = [...products];

  if (search) {
    result = result.filter((p) => p.name.startsWith(search));
  }

  if (limit) {
    result = result.slice(0, parseInt(limit));
  }

  if (minPrice) {
    result = result.filter((p) => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    result = result.filter((p) => p.price < parseFloat(maxPrice));
  }

  if (regex) {
    const pattern = new RegExp(regex, "i");
    result = result.filter((p) => pattern.test(p.name));
  }

  res.json(result);
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000....");
});
