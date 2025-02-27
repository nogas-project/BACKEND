import jwt, {JwtPayload, verify} from 'jsonwebtoken';
import {config} from "../config/config";
import bcrypt from "bcryptjs";
import {MUser} from "../model/user.model";
import {dbConfig} from "../config/config.db";
import { UserService } from "./user.service";
import {loggerService as logger} from "../util/logger.util";

export class AuthService {
    private static DB = dbConfig.COL_USER;
    public static async register(first_name: string, last_name:string, email: string, password: string, phone: string, isAdmin: boolean) {
        try {
            const snapshot = await this.DB.count().get();
            const id = snapshot.data().count;
            // Create the reference with the id
            const docRef = this.DB.doc(String(id));
            // Hashing the password
            let hashedPassword = await bcrypt.hash(password, 12);
            //Create the user if the email isn't used
            if (!await UserService.findUserByEmail(email)) {
                const newUser = new MUser(id,first_name, last_name, email, hashedPassword, phone, isAdmin);
                const flag = await docRef.set(JSON.parse(JSON.stringify(newUser)));
                logger.info("Auth Service: User registered");
                return {"flag": !!flag.writeTime, "mess": id};
            } else {
                logger.error("Auth Service: Email already exists");
                return {"flag": false, "mess": "Email already exists"};
            }
        }catch (e) {
            logger.error("Auth Service: " + e);
            return {"flag":false,"mess":"Something went wrong"};
        }

    }

    public static async login(email:string, password:string) {
        try{
            const user = await UserService.findUserByEmail(email);
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    logger.info("Auth Service: User logged in");
                    return {"flag":true,"mess":jwt.sign({id: user.id, admin: user.isAdmin}, config.JWT_SECRET, {expiresIn: "8h"})};
                }
                else{
                    logger.error("Auth Service: Invalid credentials");
                    return {"flag":false,"mess":"Invalid credentials"};
                }
            }
            else{
                logger.error("Auth Service: Invalid credentials");
                return {"flag":false,"mess":"Invalid credentials"};
            }
        }catch (e:any) {
            logger.error("Auth Service: " + e);
            return {"flag":false,"mess":"Something went wrong"};
        }

    }

}