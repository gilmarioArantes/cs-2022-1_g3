import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { UserController } from "../controllers/UserController";
import bcrypt from "bcrypt";

export class AuthMiddleware {
  constructor() {}

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserController.authenticate(email);
      if (!user) {
        return res.json({ message: "User not found" });
      }
      console.log(user);
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "24h",
            }
          );
          console.log(token);
          return res.json({ token });
        } else {
          console.log("Senha incorreta");
          return res.json({ message: "Invalid password" });
        }
      }
      next(user);
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.json({ message: "Token not found" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (!decoded) {
        return res.json({ message: "Invalid token" });
      }
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
