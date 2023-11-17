const jwt = require("jsonwebtoken");
const { UnAuth } = require("../errors/error");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuth("unauthorized");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name: decoded.name };
    next();
  } catch (error) {
    throw new UnAuth("unauthorized");
  }
};

module.exports = authMiddleware;
