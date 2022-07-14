import {Request, Response} from "express";
import {prisma} from "../database/prismaClient";

export class MessageController {

    async createMessage(req: Request, res: Response) {
        try {
            const {userId, chatId, text} = req.body;
            const chat = await prisma.chat.findUnique({where: {id: chatId}});
            if (!chat) {
                return res.status(404).json({message: "Chat not found"});
            }
            const user = await prisma.user.findUnique({where: {id: userId}});
            if (!user) {
                return res.status(404).json({message: "User not found"});
            }
            const newMessage = await prisma.message.create({
                data: {
                    chatId: chatId,
                    userId: userId,
                    text: text
                }
            });
            return res.status(200).json(newMessage);
        }catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async listMessages(req: Request, res: Response) {
        try {
            const users = await prisma.message.findMany();
            return res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

}
