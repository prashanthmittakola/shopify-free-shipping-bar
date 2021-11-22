const Shopify = require("shopify-api-node");

export default async function handler(req, res) {
  const { shopOrigin, accessToken } = req.cookies;

  const shopify = new Shopify({
    shopName: shopOrigin,
    accessToken,
  });

  const currencyList = await shopify.currency.list();

  res.status(200).json({ data: "OKK", currencyList });
}
