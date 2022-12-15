const jwt = require("jsonwebtoken");
import { config } from "dotenv";

config();

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token invalid" });
  }
};

export default verifyToken;
