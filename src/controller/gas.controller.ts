import {GasService as gs} from "../service/gas.service";
import { Request, Response } from 'express';
import { loggerController as logger} from "../util/logger.util";

export class GasController {
    public static async getLatestInfo(req: Request, res: Response) {
        try {
            const result = await gs.latestInfo();
            if(result){
                logger.http("- 200 - Gas Controller");
                logger.info("Gas Controller: Latest Info retrieved");
                res.status(200).json(result);
            }else {
                logger.http("- 404 - Gas Controller");
                logger.error("Gas Controller: No data retrieved");
                res.status(404).json("No data");
            }
        }catch (e){
            logger.http("- 500 - Gas Controller");
            logger.error("Gas Controller: " + e);
            res.status(500).json("Something went wrong");
        }
    }
    public static async getHistoryInfo(req: Request, res: Response) {
        try {
            const result = await gs.getHistory();
            if(result == null || result.length == 0){
                logger.http("- 404 - Gas Controller");
                logger.error("Gas Controller: No data retrieved");
                res.status(404).json("No data");
            }else{
                logger.http("- 200 - Gas Controller");
                logger.info("Gas Controller: history retrieved");
                res.status(200).json(result);
            }
        }
        catch (e) {
            logger.http("- 500 - Gas Controller");
            logger.error("Gas Controller: " + e);
            res.status(500).json("Something went wrong");
        }
    }
    public static async addData(req: Request, res: Response) {
        try{
            if(!req.body.co2_amount) res.status(400).json("Missing required fields");
            const result = await gs.addData(req.body.co2_amount);
            if(result){
                logger.http("- 200 - Gas Controller");
                logger.info("Gas Controller: data added");
                res.status(200).json("Data added successfully");
            }else{
                logger.http("- 404 - Gas Controller");
                logger.error("Gas Controller: Data not added");
                res.status(404).json("Something went wrong");
            }
        }catch (e) {
            logger.http("- 500 - Gas Controller");
            logger.error("Gas Controller: " + e);
            res.status(500).json("Something went wrong");
        }
    }
}