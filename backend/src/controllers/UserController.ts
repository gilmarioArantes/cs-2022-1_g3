import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

import bcrypt from "bcrypt";

export class UserController {
  static async authenticate(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const password = await bcrypt.hash(req.body.password, 10);
      let user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        return res.json({ message: "User already exists" });
      }
      user = await prisma.user.create({ data: { name, email, password } });
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async listUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await prisma.user.findUnique({ where: { email } });
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //TODO: se der tempo criar logica para deletar ou editar um usuário.
  async updateUser() {}
  async deletUser() {}

  static async changeStatus(req: Request, res: Response) {
    try {
      const { id, status } = req.body;

      await prisma.user.update({
        where: { id },
        data: { status },
      });

      return res.json("User status updated successfully!");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error);
        res.status(404).json({ message: "User not found" });
      } else {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
