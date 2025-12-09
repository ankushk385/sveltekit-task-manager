import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";

export function signJwt(data) {
  return jwt.sign(data, JWT_SECRET, { expiresIn: "1d" });
}

console.log("JWT_SECRET =", JWT_SECRET);

export function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}
