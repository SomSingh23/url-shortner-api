let express = require("express");
let app = express();
app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
app.get("/", (req, res) => {
  res.status(200).send("Welcome to yarn");
});
app.get("/:id", (req, res) => {
  res.status(200).send(`${req.params.id}`);
});
