const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");

exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
};

AWS.config.update({
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

exports.s3 = new AWS.S3({
  apiVersion: "2006-03-01",
});
