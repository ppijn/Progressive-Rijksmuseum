const http = require('http');
const express = require("express");
const app = express();
const port = 3000;

// Set ejs in als template engine
app.set("view engine", "ejs");
app.set("views", "views");

// Stel een static map in
app.use(express.static("/public"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", renderPage);

function renderPage(req, res) {
  res.render('index', {
    pagetitle: 'Dit is een express pagina'
  });
}
