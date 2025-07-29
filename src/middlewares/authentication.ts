import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}


const ACCESS_SECRET = process.env.ACCESS_SECRET

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  console.log(token)
  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  try {
    console.log("ACCESS_SECRET from env:", ACCESS_SECRET);

    console.log(process.env.ACCESS_SECRET)
    const decoded = jwt.verify(token, 'access-secret-key' as string);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
