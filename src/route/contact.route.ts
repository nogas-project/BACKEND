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
 *         description: User's contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: [{"id": 2,"name": "eli","email": "hoduxs@gmail.com","userId": 5}]
 *       403:
 *         description: Access denied or no token provided
 *       404:
 *         description: No contacts found
 *       409:
 *         description: Forbidden NOT ALLOWED, contacts must be your own
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Emergency Contacts
 */
// @ts-ignore
router.get("/contacts/:id", verifyToken, verifyUser, cc.getContacts);

/**
 * @openapi
 * /contacts/{id}:
 *   post:
 *     summary: Add emergency contacts to a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "kleiner"
 *               email:
 *                 type: string
 *                 example: "ekleiner@email.com"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user's id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Emergency contacts added
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Contact added successfully"
 *       404:
 *         description: Contact already exists or user has the maximum amount of emergency contacts (3)
 *       409:
 *         description: Forbidden NOT ALLOWED, contacts must be your own
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Emergency Contacts
 */
// @ts-ignore
router.post("/contacts/:id", verifyToken, verifyUser, cc.addContact);

/**
 * @openapi
 * /contacts/{id}:
 *   put:
 *     summary: Modify a user's emergency contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: int
 *                 example: 2
 *               name:
 *                 type: string
 *                 example: "kleiner"
 *               email:
 *                 type: string
 *                 example: "ekleiner@email.com"
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
 *         description: Emergency contacts modified
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Contact modified successfully"
 *       404:
 *         description: Contact not found, or contact already exists
 *       409:
 *         description: Forbidden NOT ALLOWED, contacts must be your own
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Emergency Contacts
 */
// @ts-ignore
router.put("/contacts/:id",verifyToken, verifyUser, cc.modifyContact);

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a user's emergency contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: int
 *                 example: 2
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
 *         description: Contact deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Contact deleted
 *       403:
 *         description: Access denied or no token provided
 *       404:
 *         description: No contacts found
 *       409:
 *         description: Forbidden NOT ALLOWED, contacts must be your own
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Emergency Contacts
 */
// @ts-ignore
router.delete("/contacts/:id",verifyToken, verifyUser, cc.deleteContact);

export default router;