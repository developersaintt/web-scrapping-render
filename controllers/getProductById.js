const Shopify = require("shopify-api-node");
const env = require("dotenv").config();

// dotenv.config();

async function getProductById(productId) {
  var token = process.env.SHOPIFY_TOKENS;
  const shopify = new Shopify({
    shopName: process.env.SHOP_NAME,
    accessToken: token,
  });

  const metafieldsRequired = [
    "seasons_name",
    "seasons_values",
    "season_name_filter",
    "url",
    "main_accords_name",
    "main_accords_name_filter",
  ];

  // const product = await shopify.graphql(queryString);
  // const product = await shopify.metafield.list({
  //   metafield: { owner_resource: "product", owner_id: productId },
  // });

  // console.log(product);

  // const metafieldsIdsMap = product.map((metafield) => {
  //   if (metafieldsRequired.includes(metafield.key)) {
  //     return { [metafield.key]: metafield.id };
  //   }
  // });

  // // console.log("everything updated done!");
  // console.log(metafieldsIdsMap);

  const queryString = ` {
    metafields(first: 12, owner: "gid://shopify/Product/${productId}") {
      edges {
        node {
          namespace
          key
          value
        }
      }
    }
  }`;
  const product = await shopify.graphql(queryString);

  return metafieldsIdsMap;
}
module.exports = {
  getProductById,
};
