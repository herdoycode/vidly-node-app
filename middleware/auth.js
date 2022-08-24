import jwt from "jsonwebtoken";
import config from "config";
export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("No token provide");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch {
    res.status(400).send("Invalid token.");
  }
};
