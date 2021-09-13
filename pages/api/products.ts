import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const products = await prisma.product.findMany({
    orderBy: [
      {
        category: "desc"
      },
      {
        type: 'asc',
      },
      {
        name: 'asc',
      },
    ],
  });
  res.json(products);
}
