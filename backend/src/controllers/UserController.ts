import {Request, Response} from "express";
import {prisma} from "../database/prismaClient";

const bcrypt = require('bcrypt');

export class UserController {

   static async authenticate(email) {
        return await prisma.user.findUnique({where: {email}});
    }

    static async createUser(req: Request, res: Response) {
        try {
            const {name, email} = req.body
            const password = await bcrypt.hash(req.body.password, 10);
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

    static async listUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();
            return res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const {email} = req.params;
            const user = await prisma.user.findUnique({where: {email}});
            return res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            let user = await prisma.user.findUnique({where: {id}});
            if (!user) {
                return res.json({message: 'User not found'})
            }
            user = await prisma.user.update({where: {id}, data: req.body});
            return res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            let user = await prisma.user.findUnique({where: {id}});
            if (!user) {
                return res.json({message: 'User not found'})
            }
            user = await prisma.user.delete({where: {id}});
            return res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }


}
