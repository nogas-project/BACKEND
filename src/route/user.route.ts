import { Router } from "express";
import {UserController} from "../controller/user.controller";
import verifyToken from "../middleware/verifyToken.middleware";
const router = Router();
const userController = new UserController();

router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
// @ts-ignore
router.put("/user/:id", verifyToken, userController.modifyUser);


export default router;