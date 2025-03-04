import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router()
const authController = new AuthController();

/**
 * @openapi
 * /api/auth/validate:
 *   post:
 *     summary: Verify JWTs using env JWT_SECRET and returns decoded value
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWRtaW4iOmZhbHNlLCJpYXQiOjE3NDA0MjM5MjYsImV4cCI6MTc0MDQ1MjcyNn0.Vu1m1UTbxdxYMFTjAxuBO8F-3thzjdxoUs4VtmZjjbg"
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
 *       - Auth
 */
router.post("/auth/validate", authController.validateToken)

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Create a user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "gordon"
 *               last_name:
 *                 type: string
 *                 example: "freeman"
 *               email:
 *                 type: string
 *                 example: "gfreeman@email.com"
 *               password:
 *                 type: string
 *                 example: "abcd-1234"
 *               phone:
 *                 type: string
 *                 example: "514-555-5555"
 *     responses:
 *       201:
 *         description: The userId for the created account
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 6
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: An account with this email already exists
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Auth
 */
router.post("/auth/register", authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login with a user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "gfreeman@email.com"
 *               password:
 *                 type: string
 *                 example: "abcd-1234"
 *     responses:
 *       200:
 *         description: JWT for the session
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiYWRtaW4iOmZhbHNlLCJpYXQiOjE3NDA0MjYxNDgsImV4cCI6MTc0MDQ1NDk0OH0.4shA66JL_119S1wJN_p_SkqLgGFMa5VL_WMSyTAWbIo"
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Auth
 */
router.post("/auth/login", authController.login);

export default router;