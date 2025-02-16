import { Router } from "express";
import {UserController} from "../controller/user.controller";
import verifyToken from "../middleware/verifyToken.middleware";
import verifyUser from "../middleware/verifyUser.middleware";
import verifyRole from "../middleware/verifyRole.middleware";

const router = Router();
const userController = new UserController();

router.put("/user/:id", verifyToken, verifyUser, userController.modifyUser);
router.get("/user/:id", verifyToken, verifyUser, userController.findById);
router.delete("/user/:id", verifyToken, verifyRole, userController.deleteUser)

export default router;