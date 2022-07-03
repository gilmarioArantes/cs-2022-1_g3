import {Request, Response} from "express";
import {prisma} from "../database/prismaClient";

export class UserController {

    async createUser(req: Request, res: Response) {
        try {
            const {name, email, password} = req.body
            let user = await prisma.user.findUnique({where: {email}});
            if (user) {
                return res.json({message: 'User already exists'})
            }
            user = await prisma.user.create({data: {name, email, password}});
            return res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async listUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();
            return res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const {email} = req.params;
            const user = await prisma.user.findUnique({where: {email}});
            return res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    //TODO: se der tempo criar logica para deletar ou editar um usuário.
    async updateUser() {}
    async deletUser() {}
}
