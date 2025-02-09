import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next';

interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const products: Product[] = await prisma.product.findMany({
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
