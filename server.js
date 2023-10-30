const express = require("express");
const bodyParser = require("body-parser");
const { scrapURL } = require("./controllers/scrapController");
const { scrapURL2 } = require("./controllers/scrapController2");
const cors = require("cors");
const axios = require("axios");

const fs = require("fs");
const { getProductById } = require("./controllers/getProductById");

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.options("*", cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Function to handle the root path
app.get("/api/scrap", async function (req, res) {
  const data = fs.readFileSync("productids.txt", "utf8");
  const fURLsdata = fs.readFileSync("fragranticaURLs.txt", "utf8");

  const productIds = data.split("\n");
  const fURLs = fURLsdata.split("\n");

  res.send({ message: "doing scrapping" });
  for (let index = 0; index < productIds.length; index++) {
    const productId = productIds[index];
    const fURL = fURLs[index];
    if (fURL === "") continue;
    console.log(fURL, productId);
    await scrapURL2(req, res, productId, fURL);
  }
});

// app.get("/local", async function (req, res) {
//   const urlParam = req.query?.url;
//   const appUri = req.query?.appurl;

//   if (!urlParam) {
//     //   res.writeHead(200, { "Content-Type": "application/json" });
//     res.send({ error: "url is required" });
//     return;
//   }

//   if (!urlParam.includes("fragrantica.com")) {
//     //   res.writeHead(200, { "Content-Type": "application/json" });
//     res.send({ error: "only accepts fragrantic urls" });
//     return;
//   }
//   // var response = await axios.get(`${appUri}/api/scrap?url=${urlParam}`);
//   var response = await axios.get(`/api/scrap?url=${urlParam}`);
//   console.log(response);
// });

let server = app.listen(8080, function () {
  console.log("Server is listening on port 8080");
});
