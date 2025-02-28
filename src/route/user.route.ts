import { Router } from "express";
import {UserController} from "../controller/user.controller";
import verifyToken from "../middleware/verifyToken.middleware";
import verifyUser from "../middleware/verifyUser.middleware";
import verifyRole from "../middleware/verifyRole.middleware";

const router = Router();
const userController = new UserController();

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     summary: Modify user's information
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
 *         description: User modified
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User modified successfully"
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Access denied or no token provided
 *       404:
 *         description: Email already exists
 *       409:
 *         description: Forbidden NOT ALLOWED, account must be your own
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - User
 */
router.put("/user/:id", verifyToken, verifyUser, userController.modifyUser);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Get user's information
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
 *         description: User's information
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: {"id": 5,"first_name": "gordon","last_name": "freeman","email": "gfreeman@email.com","password": "$2a$12$jtHbzGo4xGrRtQwgqkdE6exPQ3rf2mZyTqVTah75uqYC2t3ipUIZu","phone": "514-514-5555","isAdmin": false}
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Access denied or no token provided
 *       409:
 *         description: Forbidden NOT ALLOWED, account must be your own
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - User
 */
router.get("/user/:id", verifyToken, verifyUser, userController.findById);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: Delete user *Must have admin authorization
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
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: true
 *       403:
 *         description: Access denied or no token provided
 *       409:
 *         description: Forbidden NOT ALLOWED, account must be your own
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - User
 */
router.delete("/user/:id", verifyToken, verifyRole, userController.deleteUser)

export default router;