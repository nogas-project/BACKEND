import {MUser} from "../model/user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {dbConfig} from "../config/config.db";
import {config} from "../config/config";
import {loggerService as logger} from "../util/logger.util";

export class UserService {
    private static DB = dbConfig.COL_USER;
    private static DB_C = dbConfig.COL_CONTACT;

    public static async findUserByEmail(email1:string) {
        try {
            let id, email, last_name, first_name, phone, password, isAdmin;
            const query = await this.DB.where('email', '==', email1).get();
            if (!query.empty) {
                query.docs.map(doc => {
                    id = doc.data().id!;
                    email = doc.data().email;
                    first_name = doc.data().first_name;
                    last_name = doc.data().last_name;
                    password = doc.data().password;
                    phone = doc.data().phone;
                    isAdmin = doc.data().isAdmin;
                });
                logger.info("User Service: User found")
                return new MUser(id!, first_name!, last_name!, email!, password!, phone!, isAdmin!);
            } else {
                logger.info("User Service: User found")
                return false;
            }
        }catch (e) {
            logger.error("User Service: " + e);
            return false;
        }
    }

    public static async modifyUser(first_name: string, last_name:string, email: string, password: string, phone: string, id:number) {
        try{
            const docRef = this.DB.doc(String(id));

            if(password!="") password = await bcrypt.hash(password, 12);
            const user = await this.findUserByEmail(email);
            if(user && user.id != id) {
                logger.error("User Service: Email already exists")
                return {"flag":false,"mess":"Email already exists"};
            }

            const newUser = new MUser(id,first_name, last_name, email, password, phone, false);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newUser)));
            logger.info("User Service: User modified")
            return {"flag": !!flag.writeTime, "mess": "User modified successfully"};
        }catch(err : any){
            logger.error("User Service: " + err);
            return {"flag":false,"mess":"Something went wrong"};
        }
    }

    public static async deleteUser(id: string) {
        try{
            const contacts = await this.DB_C.where('userId', '==', id).get()
            contacts.forEach(contact => {
                contact.ref.delete();
            })
            const docRef = this.DB.doc(id);
            logger.info("User Service: User Deleted")
            return !!await docRef.delete();
        }catch (e:any){
            logger.error("User Service: " + e);
            return false;
        }
    }

    public static async findUserByID(docID:number) {
        try{
            const user = await this.DB.doc(String(docID)).get();
            if(user.data()){
                logger.info("User Service: User found")
                // @ts-ignore
                return new MUser(user.data().id,user.data().first_name, user.data().last_name, user.data().email, user.data().password, user.data().phone, user.data().isAdmin);
            }else{
                logger.error("User Service: User not found");
                return false;
            }
        }catch (e:any){
            logger.error("User Service: " + e);
            return false;
        }

    }
}