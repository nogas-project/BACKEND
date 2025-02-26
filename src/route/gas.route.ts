import { Router } from "express";
import {GasController as gc} from "../controller/gas.controller";
import verifyToken from "../middleware/verifyToken.middleware";
import verifyRole from "../middleware/verifyRole.middleware";
import verifyUser from "../middleware/verifyUser.middleware";

const router = Router();

/**
 * @openapi
 * /latest/{id}:
 *   get:
 *     summary: Get latest gas snapshot
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
 *         description: Latest gas snapshot
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: {"id": 24,"co2_amount": 0.004464326691793705,"timestamp": 1740434860843}
 *       403:
 *         description: Access denied or no token provided
 *       404:
 *         description: No data
 *       409:
 *         description: Forbidden NOT ALLOWED
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Gas
 */
// @ts-ignore
router.get("/latest/:id", verifyToken, verifyUser, gc.getLatestInfo);

/**
 * @openapi
 * /history/{id}:
 *   get:
 *     summary: Get all gas snapshots
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
 *         description: All gas snapshots
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: [{"id": 1,"co2_amount": 0.004464326691793705,"timestamp": 1740434860843}, {"id": 2,"co2_amount": 0.004464326691793705,"timestamp": 1740434860843}]
 *       403:
 *         description: Access denied or no token provided
 *       404:
 *         description: No data
 *       409:
 *         description: Forbidden NOT ALLOWED
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Gas
 */
// @ts-ignore
router.get("/history/:id", verifyToken, verifyUser, gc.getHistoryInfo);

/**
 * @openapi
 * /addData:
 *   post:
 *     summary: Add gas snapshot *Must have admin authorization, mainly used by Pi for uploading sensor data
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
 *     security:
 *      - BearerAuth: []
 *     responses:
 *       200:
 *         description: Data added
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Data added successfully"
 *       400:
 *         description: Missing required fields
 *       403:
 *         description: Access denied or no token provided
 *       409:
 *         description: Forbidden NOT ALLOWED
 *       500:
 *         description: Internal Server Error
 *     tags:
 *       - Gas
 */
// @ts-ignore
router.post("/addData", verifyToken, verifyRole, gc.addData);

export default router;