import {MUser} from "../model/user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {dbConfig} from "../config/config.db";
import {config} from "../config/config";
export class UserService {
        private static DB = dbConfig.COL_USER;
        public static async createUser(first_name: string, last_name:string, email: string, password: string, phone: string, isAdmin: boolean) {
                 const snapshot = await this.DB.count().get();
                 const id = snapshot.data().count;
                 // Create the reference with the id
                 const docRef = this.DB.doc(String(id));
                 // Hashing the password
                 let hashedPassword = await bcrypt.hash(password, 12);
                 //Create the user if the email isn't used
                 if(!await this.findUserByEmail(email)){
                     const newUser = new MUser(first_name, last_name, email, hashedPassword, phone, isAdmin);
                     const flag = await docRef.set(JSON.parse(JSON.stringify(newUser)));
                     return !!flag.writeTime;
                 }else{
                     return false;
                 }

        }
        public static async findUserByEmail(email1:string) {
             let id,email,last_name, first_name, phone, password,isAdmin;
                 const query = await this.DB.where('email', '==', email1).get();
                 if(!query.empty){
                         query.docs.map(doc => {
                                     id = doc.id;
                                     email = doc.data().email;
                                     first_name = doc.data().first_name;
                                     last_name= doc.data().last_name;
                                     password= doc.data().password;
                                     phone= doc.data().phone;
                                     isAdmin= doc.data().isAdmin;
                         });
                         // @ts-ignore
                     return new MUser(first_name, last_name, email, password, phone, isAdmin, id);
                 }else{
                     return false;
                 }
        }
    public static async login(email:string, password:string) {
        const user = await this.findUserByEmail(email);
        try{
            if (user) {
                // @ts-ignore
                if (bcrypt.compareSync(password, user.password)) {
                    return jwt.sign({id: user.id, admin: user.isAdmin}, config.JWT_SECRET, {expiresIn: "8h"});
                }
                else return "Invalid credentials";
            }
            else return "Invalid credentials";
        }catch (e:any) {
            return "Error from our side";
        }

    }
    public static async modifyUser(first_name: string, last_name:string, email: string, password: string, phone: string, id:number) {
        const docRef = this.DB.doc(String(id));
        const user = await this.findUserByID(id);
        let originalEmail;
        if (typeof user !== "boolean") {
            originalEmail = user.email;
        }
        if(password!="") password = await bcrypt.hash(password, 12);
        if(await this.findUserByEmail(email) && originalEmail != email) return false;
        try{
            const newUser = new MUser(first_name, last_name, email, password, phone, false);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newUser)));
            return !!flag.writeTime;
        }catch(err : any){
            return "Error modifying user: " + err.message;
        }
    }
    public static async deleteUser(id: string) {
        try{
            const docRef = this.DB.doc(id);
            return !!await docRef.delete();
        }catch (e:any){
            console.error(e);
            return false;
        }
    }
    public static async findUserByID(docID:number) {
        const user = await this.DB.doc(String(docID)).get();
        if(user.data()){
            // @ts-ignore
            return new MUser(user.data().first_name, user.data().last_name, user.data().email, user.data().password, user.data().phone, user.data().isAdmin, docID);
        }else{
            return false;
        }
    }
}
const userService = new UserService();
// test result true it return true
// userService.createUser("John", "John", "test2@gmail.com","johnDoe123","514-870-3518",false);
// if the previous command was executed then it should return false
// userService.createUser("John", "John", "john.doe@gmail.com","johnDoe123","514-870-3518",false);
// test result true it return the user
// userService.findUserByEmail("john.doe@gmail.com");
// test result false it return false
// userService.findUserByEmail("shaheem@gmail.com");
//test result true it return the user
// userService.login("test2@gmail.com","johnDoe123");
// userService.modifyUser("John", "John", "test2test@gmail.com","johnDoe123","514-870-3518",false, 2).then(result => console.log(result));
// userService.findUserByID(90);