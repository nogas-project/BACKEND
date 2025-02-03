import {MUser} from "../model/user.model";
import bcrypt from 'bcryptjs';
import db from "../util/database.util";
import jwt from 'jsonwebtoken';
import {firestore} from "firebase-admin";
import {decodeJwt} from "firebase-admin/lib/utils/jwt";
import {config} from "../config/config"
export class UserService {
        database = db;
         async createUser(first_name: string, last_name:string, email: string, password: string, phone: string, isAdmin: boolean) {
                 // Generate the id
                 const snapshot = await db.collection("User").count().get();
                 const id = snapshot.data().count;
                 // Create the reference with the id
                 const docRef = db.collection('User').doc(String(id));
                 // Hashing the password
                 let hashedPassword = await bcrypt.hash(password, 12);
                 //Create the user if the email isn't used
                 if(!await this.findUserByEmail(email)){
                     const newUser = new MUser(first_name, last_name, email, hashedPassword, phone, isAdmin);
                     const flag = await docRef.set(JSON.parse(JSON.stringify(newUser)));
                     return !!flag.writeTime;
                 }else{
                     console.log("Creating user: " + false);
                     return false;
                 }

        }
        async findUserByEmail(email1:string) {
             let id,email,last_name, first_name, phone, password,isAdmin;
                 const query = await db.collection('User').where('email', '==', email1).get();
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
        async login(email:string, password:string){
             const user = await this.findUserByEmail(email);
             if(user){
                 // @ts-ignore
                 if(bcrypt.compareSync(password, user.password)){
                     return jwt.sign({ id:user.id, admin:user.isAdmin }, config.JWT_SECRET, { expiresIn:"8h" });
                 }
             }
             else{
                 return false;
             }

        }
    async modifyUser(first_name: string, last_name:string, email: string, password: string, phone: string, isAdmin: boolean,id:number) {
        const docRef = db.collection('User').doc(String(id));
        const getDoc = await docRef.get();
        // @ts-ignore
        // let email1 = getDoc.data().email;
        // Hashing the password
        // let hashedPassword = await bcrypt.hash(password, 12);
        //Create the user if the email isn't used
        // if(!await this.findUserByEmail(email)){
        //     const newUser = new MUser(first_name, last_name, email, hashedPassword, phone, isAdmin);
        //     const flag = await docRef.set(JSON.parse(JSON.stringify(newUser)));
        //     return !!flag.writeTime;
        // }else{
        //     console.log("Creating user: " + false);
        //     return false;
        // }

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
userService.modifyUser("John", "John", "test2@gmail.com","johnDoe123","514-870-3518",false, 2);