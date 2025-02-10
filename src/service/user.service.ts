import {MUser} from "../model/user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {dbConfig} from "../config/config.db";
import {config} from "../config/config";
export class UserService {
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
                if (!await this.findUserByEmail(email)) {
                    const newUser = new MUser(first_name, last_name, email, hashedPassword, phone, isAdmin);
                    const flag = await docRef.set(JSON.parse(JSON.stringify(newUser)));
                    return {"flag": !!flag.writeTime, "mess": "User created successfully"};
                } else {
                    return {"flag": false, "mess": "Email already exists"};
                }
            }catch (e) {
                return {"flag":false,"mess":"Something went wrong"};
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
        try{
            const user = await this.findUserByEmail(email);
            if (user) {
                // @ts-ignore
                if (bcrypt.compareSync(password, user.password)) {
                    return {"flag":true,"mess":jwt.sign({id: user.id, admin: user.isAdmin}, config.JWT_SECRET, {expiresIn: "8h"})};
                }
                else return {"flag":false,"mess":"Invalid credentials"};
            }
            else return {"flag":false,"mess":"Invalid credentials"};
        }catch (e:any) {
            return {"flag":false,"mess":"Something went wrong"};
        }

    }
    public static async modifyUser(first_name: string, last_name:string, email: string, password: string, phone: string, id:number) {
        try{
            const docRef = this.DB.doc(String(id));

            if(password!="") password = await bcrypt.hash(password, 12);
            if(await this.findUserByEmail(email)) return {"flag":false,"mess":"Email already exists"};

            const newUser = new MUser(first_name, last_name, email, password, phone, false);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newUser)));
            return {"flag": !!flag.writeTime, "mess": "User modified successfully"};
        }catch(err : any){
            return {"flag":false,"mess":"Something went wrong"};
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
        try{
            const user = await this.DB.doc(String(docID)).get();
            if(user.data()){
                // @ts-ignore
                return new MUser(user.data().first_name, user.data().last_name, user.data().email, user.data().password, user.data().phone, user.data().isAdmin, docID);
            }else{
                return false;
            }
        }catch (e:any){
            return false;
        }

    }
}
// test result true it return true

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