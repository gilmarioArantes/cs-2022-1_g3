import {Request, Response} from "express";
import {prisma} from "../database/prismaClient";

export class ChatController {

    async createChat(req: Request, res: Response) {
        const name = req.body.chatName;
        try {
            const chat = await prisma.chat.create({data: {name}});
            return res.json(chat);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async getChat(req: Request, res: Response) {
        const id = req.params.id;
        try {
            let chat = await prisma.chat.findUnique({where: {id}});
            const message = await prisma.message.findMany({
                where: {
                    chatId: id,
                }
            });
            if(chat) {
                chat['messages'] = message;
                return res.json(chat);
            }
            res.status(404).json({message: "Chat not found"});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }



}
