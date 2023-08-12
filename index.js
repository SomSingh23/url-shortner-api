require("dotenv").config();
let express = require("express");
let generateRandomString = require("./random");
let mongoose = require("mongoose");
let AddData = require("./data");
let cors = require("cors");
let template404 = require("./error");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.link)
  .then(() => {
    console.log(
      "Server has taken flight into the cloud, unlocking boundless potential."
    );
  })
  .catch((err) => {
    console.log(err);
  });
let app = express();
app.use(cors());
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
app.get("/", async (req, res) => {
  try {
    let { url } = req.query;
    if (url === null || url === "") {
      res.status(404).send("Enter Proper URL");
      return;
    }
    let dataFound = await AddData.findOne({ originalUrl: url });
    if (dataFound) {
      console.log("data found already");
      res.status(200).send(`${process.env.link2}${dataFound.redirectUrl}`);
      return;
    }
    let ____t = generateRandomString();
    let data = new AddData({ originalUrl: url, redirectUrl: ____t });
    await data.save();
    res.status(200).send(`${process.env.link2}${____t}`);
  } catch (err) {
    res
      .status(400)
      .send(
        `Request Format Must be like: ${process.env.link2}?url=https://example.com`
      );
  }
});
app.get("/:url", async (req, res) => {
  try {
    let { url } = req.params;

    let foundData = await AddData.findOne({ redirectUrl: url });
    if (foundData) {
      res.redirect(foundData.originalUrl);
      return;
    }
    res.status(404).send(template404);
  } catch (err) {
    res.status(404).send(template404);
  }
});
app.get("*", (req, res) => {
  res.status(404).send(template404);
});
