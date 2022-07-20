import express from 'express'
import {UserController} from "../controllers/UserController";
import {ChatController} from "../controllers/ChatController";
import {MessageController} from "../controllers/MessageController";
import {AuthMiddleware} from "../middlewares/AuthMiddleware";

const routes = express.Router()

const userController = new UserController();
const chatController = new ChatController();
const messageController = new MessageController();

routes.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({message: 'API Request'})
})

//TODO: pegar as informações do usuário para validar um token
routes.post('/login', (req: express.Request, res: express.Response) => {
    console.log(req.body);
    res.status(200).json({message: 'API Request', user: req.body.user, password: req.body.password})
})

routes.post('/signup', userController.createUser);
routes.get('/user/:email', userController.getUser);
routes.get('/users', userController.listUsers);
routes.put('/user/status', userController.changeStatus)
routes.put('/user/update', userController.updateUser)
routes.delete('/user/delete', userController.deleteUser)

routes.post('/chat', chatController.createChat);
routes.get('/chat/:id', chatController.getChat);

routes.post('/message', messageController.createMessage);
routes.get('/messages', messageController.listMessages);
routes.get('/message/:id', messageController.listMessages);

export default routes
