import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const products = await prisma.product.findMany({
    orderBy: [{ name: "asc" }],
  });
  res.json(products);
}
