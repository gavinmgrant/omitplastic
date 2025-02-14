import * as cheerio from "cheerio";
import Cors from "cors";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const cors = Cors({
  methods: ["POST"],
});

interface MiddlewareFn {
  (req: any, res: any, fn: (result: any) => void): void;
}

function runMiddleware(req: any, res: any, fn: MiddlewareFn): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

interface PriceRequestBody {
  ASIN: string;
  currentPrice: string;
}

interface PriceResponse {
  price?: string;
  html?: string;
  error?: string;
}

export default async function getPrice(
  req: NextApiRequest & { body: PriceRequestBody },
  res: NextApiResponse<PriceResponse>
) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    const { ASIN: asin, currentPrice } = req.body;

    try {
      const response = await fetch(`https://www.amazon.com/dp/${asin}`);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const price =
        $(".a-offscreen").text().split("$")[1] ||
        $(".aok-offscreen").text().split("$")[1];
      const availability = $("#availability").text();
      const unavailable = availability.includes("unavailable");

      res.statusCode = 200;

      const canUpdate =
        currentPrice !== price && price?.length < 8 && price?.length > 3;

      if (canUpdate) {
        await prisma.product.update({
          where: {
            asin: asin,
          },
          data: {
            price: price,
          },
        });
      }

      if (unavailable) {
        await prisma.product.update({
          where: {
            asin: asin,
          },
          data: {
            price: "Unavailable",
          },
        });
      }

      return res.json({
        price: price,
        html: htmlString,
      });
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        error: `Price for item ${asin} is not found.`,
      });
    }
  }
}
