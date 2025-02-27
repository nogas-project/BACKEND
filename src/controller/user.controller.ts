import {UserService} from "../service/user.service";
import { Request, Response } from 'express';
import { loggerController as logger} from "../util/logger.util";

export class UserController {

    public async modifyUser(req: Request, res: Response) {
        try {
            let {first_name, last_name, email, password, phone} = req.body;
            let id = req.params.id;
            if(!first_name || !last_name || !email || !password || !phone) {
                logger.http("- 400 - User Controller");
                logger.error("User controller: Missing required fields");
                res.status(400).json("Missing required fields");
            }
            else{
                const result = await UserService.modifyUser(first_name, last_name, email, password,phone,Number(id));
                if(result.flag){
                    logger.http("- 200 - User Controller");
                    logger.info("User controller: User modified");
                    res.status(200).json(result);
                }
                else {
                    logger.http("- 404 - User Controller");
                    logger.error("User controller: User not modified");
                    res.status(404).json(result);
                }
            }
        }catch (e){
            logger.http("- 500 - User Controller");
            logger.error("User controller: " + e);
            res.status(500).send(false);
        }
    }

    public async findById(req: Request, res: Response) {
        try {
            let id = req.params.id;
            const result = await UserService.findUserByID(Number(id));
            if(result){
                logger.http("- 200 - User Controller");
                logger.info("User controller: User found");
                res.status(200).json(result);
            }
            else {
                logger.http("- 404 - User Controller");
                logger.error("User controller: User not found");
                res.status(404).send(result);
            }
        }catch (e:any){
            logger.http("- 500 - User Controller");
            logger.error("User controller: " + e);
            res.status(500).send(false);
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            let id = req.params.id;
            const result = await UserService.deleteUser(id);
            if(result){
                logger.http("- 200 - User Controller");
                logger.info("User controller: User deleted");
                res.status(200).json(result);
            }
            else {
                logger.http("- 404 - User Controller");
                logger.error("User controller: User not deleted");
            } res.status(404).send(result);
        } catch (e) {
            logger.http("- 500 - User Controller");
            logger.error("User controller: " + e);
            res.status(500).send(false);
        }

    }

}