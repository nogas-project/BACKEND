import {MUser} from "../model/user.model";
import bcrypt from 'bcryptjs';
import db from "../util/database.util";
import {firestore} from "firebase-admin";
import SetOptions = firestore.SetOptions;

export class UserService {
        database = db;
         async createUser(first_name: string, last_name:string, email: string, password: string, phone: string, isAdmin: boolean) {
                 // Generate the id
                 // const snapshot = await db.collection("User").count().get();
                 // const id = snapshot.data().count;
                 // Create the reference with the id => email
                 const docRef = db.collection('User').doc(first_name + "_" + last_name);
                 // Hashing the password
                 let hashedPassword = await bcrypt.hash(password, 12);
                 //Create the user if doesnt exist
                 if(!(await docRef.get()).exists){
                         const newUser = new MUser(first_name, last_name, email, hashedPassword, phone, isAdmin);
                         const flag = await docRef.set(JSON.parse(JSON.stringify(newUser)));
                         console.log(!!flag.writeTime);
                         return !!flag.writeTime;
                 }else{
                         console.log(false);
                         return false;
                 }

        }
        async findUserByEmail(email:string){
                 const query = await db.collection('User').where('email', '==', email).get();
                 if(!query.empty){
                         query.docs.map(doc => {
                                 console.log(doc.data());
                                 return doc.data();
                         });
                 }else{
                         console.log(false);
                 }
        }

}
const userService = new UserService();
userService.createUser("John", "John", "john.doe@gmail.com","johnDoe123","514-870-3518",false);
// test result true it return the user
// userService.findUserByEmail("john.doe@gmail.com");
// test result false it return false
// userService.findUserByEmail("shaheem@gmail.com");