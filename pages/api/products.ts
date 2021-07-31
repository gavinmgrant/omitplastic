import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const products = await prisma.product.findMany();
  res.json(products);
}
