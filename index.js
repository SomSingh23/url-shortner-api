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
app.use(cors({ origin: "https://somsingh23.github.io/URL_shortener/" }));
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
app.get("/", async (req, res) => {
  try {
    let { url } = req.query;
    url = url.trim(); // to remove any leading whitespace :)
    if (url === null || url === "") {
      res.status(400).send("Enter Proper URL");
      return;
    }
    let dataFound = await AddData.findOne({ originalUrl: url });
    if (dataFound) {
      console.log("data found already");
      res
        .status(200)
        .json({ shortUrl: `${process.env.link2}${dataFound.redirectUrl}` });
      return;
    }
    let ____t = generateRandomString();
    let data = new AddData({ originalUrl: url, redirectUrl: ____t });
    await data.save();
    res.status(200).json({ shortUrl: `${process.env.link2}${____t}` });
  } catch (err) {
    res
      .status(400)
      .send(
        `Request Format Must be like: ${process.env.link2}?url=https://example.com`
      );
  }
});
// changing the params from url to id and adding url query to the request object
app.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { url } = req.query;
    let foundData = await AddData.findOne({ redirectUrl: id });
    if (foundData) {
      res.redirect(foundData.originalUrl);
      return;
    } else if (url) {
      let dataFound = await AddData.findOne({ originalUrl: url });
      if (dataFound) {
        console.log("data found already");
        res
          .status(200)
          .json({ shortUrl: `${process.env.link2}${dataFound.redirectUrl}` });
        return;
      }
      let ____t = generateRandomString();
      let data = new AddData({ originalUrl: url, redirectUrl: ____t });
      await data.save();
      res.status(200).json({ shortUrl: `${process.env.link2}${____t}` });
      return;
    }
    res.status(404).send(template404);
    return;
  } catch (err) {
    res.status(404).send(template404);
  }
});
app.get("*", (req, res) => {
  res.status(404).send(template404);
});
