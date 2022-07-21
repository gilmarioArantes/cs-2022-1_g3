import express from "express";
import { UserController } from "../controllers/UserController";
import { ChatController } from "../controllers/ChatController";
import { MessageController } from "../controllers/MessageController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "API Request" });
});

routes.post("/login", AuthMiddleware.login, UserController.getUser);

routes.post("/signup", UserController.createUser);
routes.get("/user/:email", UserController.getUser);
routes.get("/users", UserController.listUsers);
routes.put("/user/status", UserController.changeStatus);

routes.post("/chat", AuthMiddleware.authenticate, ChatController.createChat);
routes.get("/chat/:id", AuthMiddleware.authenticate, ChatController.getChat);
routes.get("/chats", AuthMiddleware.authenticate, ChatController.listChats);
routes.put("/chat/:id", AuthMiddleware.authenticate, ChatController.updateChat);
routes.delete(
  "/chat/:id",
  AuthMiddleware.authenticate,
  ChatController.deleteChat
);

routes.post(
  "/message",
  AuthMiddleware.authenticate,
  MessageController.createMessage
);
routes.get(
  "/message/:id",
  AuthMiddleware.authenticate,
  MessageController.getMessage
);
routes.get(
  "/messages",
  AuthMiddleware.authenticate,
  MessageController.listMessages
);
routes.put(
  "/message/:id",
  AuthMiddleware.authenticate,
  MessageController.updateMessage
);
routes.delete(
  "/message/:id",
  AuthMiddleware.authenticate,
  MessageController.deleteMessage
);

export default routes;
