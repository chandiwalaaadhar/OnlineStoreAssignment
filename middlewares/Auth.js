const jwt = require("jsonwebtoken");

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.json({
      code: 401,
      message: "Please Login",
      success: false,
      data: {},
    });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.json({
        code: 403,
        message: "Unauthorised",
        success: false,
        data: {},
      });
    req.user = user;
    next();
  });
};
