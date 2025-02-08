import {GasService as gs} from "../service/gas.service";
import { Request, Response } from 'express';

export class GasController {
    public static async getLatestInfo(req: Request, res: Response) {
        try {
            const result = await gs.latestInfo();
            if(result){
                res.status(200).json(result);
            }else {
                res.status(404).json("No data");
            }
        }catch (e){
            res.status(500).send("Something went wrong");
        }
    }
    public static async getHistoryInfo(req: Request, res: Response) {
        try {
            const result = await gs.getHistory();
            if(result == null || result.length == 0){
                res.status(404).json("No data");
            }else{
                res.status(200).json(result);
            }
        }
        catch (e) {
            res.status(500).send("Something went wrong");
        }
    }
    public static async addData(req: Request, res: Response) {
        try{
            const result = await gs.addData(req.body.co2_amount);
            if(result){
                res.status(200).send("Data added successfully");
            }else{
                res.status(404).send("Something went wrong");
            }
        }catch (e) {
            res.status(500).send("Something went wrong");
        }
    }
}