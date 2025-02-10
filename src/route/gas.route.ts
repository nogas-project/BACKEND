import { Router } from "express";
import {GasController as gc} from "../controller/gas.controller";
import verifyToken from "../middleware/verifyToken.middleware";
import verifyRole from "../middleware/verifyRole.middleware";
import verifyUser from "../middleware/verifyUser.middleware";

const router = Router();

// @ts-ignore
router.get("/latest/:id", verifyToken, verifyUser, gc.getLatestInfo);
// @ts-ignore
router.get("/history/:id", verifyToken, verifyUser, gc.getHistoryInfo);
// @ts-ignore
router.post("/addData", verifyToken, verifyRole, gc.addData);

export default router;