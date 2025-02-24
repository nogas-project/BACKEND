import {contactController as cc} from "../controller/contact.controller";
import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware";
import verifyUser from "../middleware/verifyUser.middleware";
const router = Router();

/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     summary: Get a user's emergency contacts
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user's id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *      - BearerAuth: []
 *     responses:
 *       200:
 *         description: User found, return contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: {"id": 0, "admin": false, "iat": 1740423926, "exp": 1740452726}
 *       403:
 *         description: Access denied or no token provided
 *       404:
 *         description: No contacts found
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Emergency Contacts
 */
// @ts-ignore
router.get("/contacts/:id", verifyToken, verifyUser, cc.getContacts);

/**
 * @openapi
 * /contacts/id:
 *   post:
 *     summary: Add an emergency contact to a user
 *     responses:
 *       200:
 *         description: Valid token, return decoded JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: {"id": 0, "admin": false, "iat": 1740423926, "exp": 1740452726}
 *       400:
 *         description: Authentication credentials missing
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Emergency Contacts
 */
// @ts-ignore
router.post("/contacts/:id", cc.addContact);
// @ts-ignore
router.put("/contacts/:id",verifyToken, verifyUser, cc.modifyContact);
// @ts-ignore
router.delete("/contacts/:id",verifyToken, verifyUser, cc.deleteContact);

export default router;