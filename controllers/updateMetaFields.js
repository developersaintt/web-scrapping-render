const Shopify = require("shopify-api-node");
const env = require("dotenv").config();

// dotenv.config();

async function metafieldsUpdate(finalNotes, product_id) {
  var token = process.env.SHOPIFY_TOKENS;
  const shopify = new Shopify({
    shopName: process.env.SHOP_NAME,
    accessToken: token,
  });
  var { accordBoxData, seasons } = finalNotes;
  var mainAccordNames = Object.keys(accordBoxData);
  var mainAccordPerc = [];
  for (let a of mainAccordNames) {
    mainAccordPerc.push(accordBoxData[a]);
  }

  let seasonsNames = [];
  let seasonsValues = [];
  let seasonsNameFilters = [];
  if (seasons !== undefined) {
    seasonsNames = Object.keys(seasons);
    for (let a of seasonsNames) {
      seasonsValues.push(seasons[a]);
    }
    for (let a of seasonsNames) {
      const float = parseFloat(seasons[a]);
      if (float >= 7.0) {
        seasonsNameFilters.push(a);
      }
    }
  }
  await shopify.metafield.create({
    key: "main_accords_percentage",
    value: JSON.stringify(mainAccordPerc),
    type: "list.number_decimal",
    namespace: "custom",
    owner_resource: "product",
    owner_id: product_id,
  });
  await shopify.metafield.create({
    key: "main_accords_name",
    value: JSON.stringify(mainAccordNames),
    type: "list.single_line_text_field",
    namespace: "custom",
    owner_resource: "product",
    owner_id: product_id,
  });
  if (seasonsNames.length > 0) {
    await shopify.metafield.create({
      key: "seasons_name",
      value: JSON.stringify(seasonsNames),
      type: "list.single_line_text_field",
      namespace: "custom",
      owner_resource: "product",
      owner_id: product_id,
    });
  }
  if (seasonsValues.length > 0) {
    await shopify.metafield.create({
      key: "seasons_values",
      value: JSON.stringify(seasonsValues),
      type: "list.number_decimal",
      namespace: "custom",
      owner_resource: "product",
      owner_id: product_id,
    });
  }
  if (seasonsNameFilters.length > 0) {
    await shopify.metafield.create({
      key: "season_name_filter",
      value: JSON.stringify(seasonsNameFilters),
      type: "list.single_line_text_field",
      namespace: "custom",
      owner_resource: "product",
      owner_id: product_id,
    });
  }

  // console.log("everything updated done!");
  return null;
}
module.exports = {
  metafieldsUpdate,
};
