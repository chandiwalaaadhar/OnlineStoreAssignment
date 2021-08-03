const mongoose = require("mongoose");
const AdminSchema = require("../models/UserSchema");
const config = require("../config");

exports.Register = (req, res) => {
  const newUser = new AdminSchema();

  (newUser.name = req.body.name),
    (newUser.email = req.body.email),
    (newUser.password = req.body.password);

  newUser.setPassword(req.body.password);

  newUser.save((err, User) => {
    if (err) {
      return res.json({
        code: 401,
        success: false,
        message: err.message,
        data: err,
      });
    } else {
      return res.json({
        code: 200,
        success: true,
        message: "Successfully Registered",
        data: {},
      });
    }
  });
};

exports.Login = (req, res) => {
  AdminSchema.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.json({
        code: 401,
        success: false,
        message: err.message,
        data: err,
      });
    }
    if (user === null) {
      return res.json({
        code: 401,
        success: false,
        message: "User Not Found",
        data: {},
      });
    } else {
      if (user.validPassword(req.body.password)) {
        const user = { email: req.body.email };
        const accessToken = config.generateAccessToken(user);
        return res.json({
          code: 200,
          success: true,
          message: "User Logged In",
          data: { accessToken: accessToken },
        });
      } else {
        return res.json({
          code: 402,
          success: false,
          message: "Incorrect Password",
          data: {},
        });
      }
    }
  });
};
