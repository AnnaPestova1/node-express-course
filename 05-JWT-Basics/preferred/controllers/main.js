const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors/error");
const { StatusCodes } = require("http-status-codes");

const logon = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new BadRequest("You need to provide name and password");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ name, id }, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });
  res.status(200).json({ token });
};

const hello = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: `Hello, ${req.user.name}` });
};

module.exports = { logon, hello };
