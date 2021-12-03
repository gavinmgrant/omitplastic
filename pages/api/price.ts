import * as cheerio from 'cheerio';

export default async function getPrice(req, res) {
  if (req.method === "POST") {
    const asin = req.body.ASIN;

    try {
      const response = await fetch(`https://www.amazon.com/dp/${asin}`);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const price = $('.apexPriceToPay').text();

      res.statusCode = 200;
      return res.json({
        price: price,
      });
    } catch (e) {
      res.statusCode = 404;
      return res.json({
        error: `Price for item ${asin} is not found.`,
      });
    }
  }
}
