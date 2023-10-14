const express = require("express");
const bodyParser = require("body-parser");
const { scrapURL } = require("./controllers/scrapController");
const cors = require("cors");
const axios = require("axios");

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
  console.log("scrapping start");
  await scrapURL(req, res);
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
