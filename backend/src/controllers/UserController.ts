import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {Request, Response} from "express";
import {prisma} from "../database/prismaClient";
const bcrypt = require('bcrypt');

export class UserController {

    async createUser(req: Request, res: Response) {
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

    async updateUser(req:Request, res:Response) {
        try{
            const {id,data} = req.body;
            console.log(id)
            const user = await prisma.user.update({where: {id}, data:{data}});
            return res.json("User updated successfully");
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                console.log(error);
                res.status(404).json({message: 'User not found'});
            }
            else{
                console.log(error);
                res.status(500).json({message: 'Internal Server Error'});
            }
            }
    }
    
    
    async deleteUser(req:Request, res:Response) {
        try{
        const {id} = req.body;
        console.log(id)
        const deleteUser = await prisma.user.delete({where:{id}});
        return res.json("User deleted successfully");
    }catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            console.log(error);
            res.status(404).json({message: 'User not found'});
        }
        else{
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
        }
    }
    
    async changeStatus(req:Request, res:Response){
        try{
            const {id,status} = req.body;
            console.log(id)
            const user = await prisma.user.update({where: {id}, data:{status}});
            return res.json("User status updated successfully");
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                console.log(error);
                res.status(404).json({message: 'User not found'});
            }
            else{
                console.log(error);
                res.status(500).json({message: 'Internal Server Error'});
            }
            }
            
           
    }
}
