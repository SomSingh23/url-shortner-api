require("dotenv").config();
let express = require("express");
let app = express();
app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
app.get("/", (req, res) => {
  res.status(200).send(`${process.env.secret}`);
});
app.get("/:id", (req, res) => {
  res.redirect("https://github.com/SomSingh23");
});
