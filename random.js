let randomstring = require("randomstring");
let generateRandomString = () => {
  return randomstring.generate({
    charset: "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ1234567890",
    length: 9,
  });
};
module.exports = generateRandomString;
