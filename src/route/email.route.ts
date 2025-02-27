import { Router } from "express";
import {emailController as ec} from "../controller/email.controller";
import verifyToken from "../middleware/verifyToken.middleware";
import verifyUser from "../middleware/verifyUser.middleware";
import verifyRole from "../middleware/verifyRole.middleware";

const router = Router();

/**
 * @openapi
 * /sendEmail:
 *   post:
 *     summary: Send email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: "srickwolf@gmail.com"
 *               subject:
 *                 type: string
 *                 example: "Greetings"
 *               message:
 *                 type: string
 *                 example: "hello!"
 *     responses:
 *       200:
 *         description: Email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Email sent successfully"
 *       400:
 *         description: Missing parameters
 *       403:
 *         description: Access denied or no token provided
 *       404:
 *         description: Email not sent
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Emailing
 */
// @ts-ignore
router.post("/sendEmail", verifyToken, verifyRole, ec.sendEmail);

/**
 * @openapi
 * /sendEmail/{id}:
 *   post:
 *     summary: Send email to user's contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: "srickwolf@gmail.com"
 *               subject:
 *                 type: string
 *                 example: "Greetings"
 *               message:
 *                 type: string
 *                 example: "hello!"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The user's id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Email sent successfully"
 *       400:
 *         description: Missing parameters
 *       403:
 *         description: Access denied or no token provided
 *       404:
 *         description: Email not sent
 *       409:
 *         description: Forbidden NOT ALLOWED
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Emailing
 */
// @ts-ignore
router.post("/sendEmail/:id", verifyToken, verifyUser, ec.sendEmailToContact);

export default router;