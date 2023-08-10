require("dotenv").config();
let express = require("express");
let generateRandomString = require("./random");
let mongoose = require("mongoose");
let AddData = require("./data");
let cors = require("cors");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.link)
  .then(() => {
    console.log("Atlas Cloud is now connected");
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
      res.status(404).send("Enter Proper Url");
      return;
    }
    let dataFound = await AddData.findOne({ originalUrl: url });
    if (dataFound) {
      console.log("data found already");
      res.status(200).send(`localhost:5000/${dataFound.redirectUrl}`);
      return;
    }
    let ____t = generateRandomString();
    let data = new AddData({ originalUrl: url, redirectUrl: ____t });
    await data.save();
    res.status(200).send(`localhost:5000/${____t}`);
  } catch (err) {
    res
      .status(400)
      .send(
        "Request Format Must be like : http:localhost:5000?url=https://example.com"
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
    res.status(400).send("Invalid URL");
  } catch (err) {
    res.status(400).send("Url not found");
  }
});
