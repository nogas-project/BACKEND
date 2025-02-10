import { Router } from "express";
import {UserController} from "../controller/user.controller";
import verifyToken from "../middleware/verifyToken.middleware";
import verifyUser from "../middleware/verifyUser.middleware";
const router = Router();
const userController = new UserController();

router.post("/user/register", userController.register);

router.post("/user/login", userController.login);

// @ts-ignore
router.put("/user/:id", verifyToken, verifyUser, userController.modifyUser);
// @ts-ignore
router.get("/user/:id", verifyToken, verifyUser, userController.findById);

export default router;