const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const headerAuth = req.headers["authorization"];
  const token = headerAuth.split(" ")[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) res.sendStatus(403);
    else next();
  });
};
