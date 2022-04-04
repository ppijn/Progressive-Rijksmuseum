const http = require('http');
const express = require("express");
const { read } = require('fs');
const app = express();
const port = 3000;
const fetch = (...args) => import("node-fetch").then(({ default: fetch}) => fetch(...args))



// Set ejs in als template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Stel een static map in
app.use(express.static("public"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


app.get("/", async (request, response) => {
  const rijksAPI =
  `https://www.rijksmuseum.nl/api/nl/collection?key=8Rynz75W&p=0-n&ps=10&imgonly=true`
  const json = await fetch(rijksAPI)
  .then(res => res.json())
  .catch(e => {
    console.error({
      'message': 'oh no',
      error: e,
    })
  })
  
  // console.log(json.artObjects)
  response.render("index", {
    data: json.artObjects
  })
});

app.get("/search", async (request, response) => {
  const rijksAPI =
  `https://www.rijksmuseum.nl/api/nl/collection?key=8Rynz75W&q=${request.query.q}&p=0-n&ps=10&imgonly=true`
  console.log(request.query.q)
  
  const json = await fetch(rijksAPI)
  .then(res => res.json())
  .catch(e => {
    console.error({
      'message': 'oh no',
      error: e,
    })
  })
  console.log(json.artObjects)
  response.render("index", {
    data: json.artObjects
  })
});

// Service Worker 

