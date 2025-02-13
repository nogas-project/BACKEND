import {contactController as cc} from "../controller/contact.controller";
import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware";
import verifyUser from "../middleware/verifyUser.middleware";
const router = Router();

// @ts-ignore
router.get("/contacts/:id",verifyToken, verifyUser, cc.getContacts);
// @ts-ignore
router.post("/contacts/:id", cc.addContact);
// @ts-ignore
router.put("/contacts/:id",verifyToken, verifyUser, cc.modifyContact);
// @ts-ignore
router.delete("/contacts/:id",verifyToken, verifyUser, cc.deleteContact);

export default router;