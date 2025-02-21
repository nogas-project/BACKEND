import { Router } from "express";
import {emailController as ec} from "../controller/email.controller";
import verifyToken from "../middleware/verifyToken.middleware";
import verifyUser from "../middleware/verifyUser.middleware";

const router = Router();

// @ts-ignore
router.post("/sendEmail", verifyToken, ec.sendEmail);
// @ts-ignore
router.post("/sendEmail/:id", verifyToken, verifyUser, ec.sendEmailToContact);

export default router;