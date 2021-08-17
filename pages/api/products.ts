import prisma from "../../lib/prisma";
import axios from "axios";

export default async function handle(req, res) {
  const products = await prisma.product.findMany({
    orderBy: [{ name: "asc" }],
  });
  products.forEach((product) => {
    axios
      .get(
        `https://amazon-product-scrapper.p.rapidapi.com/products/${product.asin}`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_AMAZON_SCRAPPER_API_KEY,
          },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_XRAPID_API_KEY,
            "x-rapidapi-host": "amazon-web-scrapper.p.rapidapi.com",
          },
        }
      )
      .then((response) => {
        const p = {price: response.data.price};
        product = {...product, ...p};
      })
      .catch((error) => {
        console.error(error);
      });
  });
  res.json(products);
}
