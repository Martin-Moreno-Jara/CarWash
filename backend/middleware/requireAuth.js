const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ error: "Authorization required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_STRING);
    req.loggedUser = await userModel.findOne({ _id }).select("_id rol usuario");
    next();
  } catch (error) {
    res.status(401).json({ error: "invalid token" });
  }
};

module.exports = requireAuth;
