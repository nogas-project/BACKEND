import {MEmergencyContact} from "../model/contact.model";
import {dbConfig} from "../config/config.db";
import {loggerService as logger} from "../util/logger.util";

export class ContactService {
    private static DB = dbConfig.COL_CONTACT;
    public static async getContacts(userId:number) {
        try {
            let result = new Array<MEmergencyContact>();
            const query = await this.DB.where("userId", "==", userId).get();
            if(!query.empty){
                query.docs.map(value=>{
                    result.push(new MEmergencyContact(value.data().id, value.data().name,value.data().email, value.data().userId));
                })
                logger.info("Contact Service: Contacts retrieved")
                return result;
            }
            else {
                logger.error("Contact Service: Contacts not retrieved");
                return null;
            }
        }catch (error) {
            logger.error("Contact Service: " + error);
            return null;
        }
    }
    public static async addContact(name: string, email: string, userId: number) {
        try{
            //Check if user already have 3 contacts
            const snapshot = await this.DB.where("userId", '==', userId).count().get();
            const count = snapshot.data().count;
            if(count == 3) {
                logger.error("Contact Service: Already have 3 contacts");
                return {"flag":false,"mess":"Already have 3 contacts"}
            }
            //Check if the new contact does not already exist
            const ss = await this.DB.where("userId", '==', userId).where("email", '==', email).count().get();
            const total = ss.data().count;
            if(total == 1){
                logger.error("Contact Service: Email already exists");
                return {"flag":false,"mess":"This email address is already in use"};
            }

            const sp = await this.DB.count().get();
            const id = sp.data().count;
            let docRef = this.DB.doc(String(id));
            const newData = new MEmergencyContact(id, name, email, userId);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newData)));
            logger.info("Contact Service: Contact added");
            return {"flag":!!flag.writeTime,"mess":"Contact added successfully"};
        }catch (e:any){
            logger.error("Contact Service: " + e);
            return {"flag":false,"mess":"Something went wrong"};
        }
    }
    public static async modifyContact(name: string, email: string, userId: number, id: number) {
        try{
            const docRef = this.DB.doc(String(id));
            const doc = await docRef.get();
            let originalEmail;

            if(!doc.data()) {
                logger.error("Contact Service: Contact not found");
                return {"flag":false,"mess":"Contact not found"};
            }
            // @ts-ignore
            originalEmail = doc.data().email;

            //Check if the contact does not already exist( email )
            const ss = await this.DB.where("userId", '==', userId).where("email", '==', email).count().get();
            const total = ss.data().count;
            if(total == 1 && email != originalEmail) {
                logger.error("Contact Service: Email already exists");
                return {"flag":false,"mess":"This email address is already in use"};
            }

            const newData = new MEmergencyContact(id,name, email, userId);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newData)));
            logger.info("Contact Service: Contact modified");
            return {"flag":!!flag.writeTime,"mess":"Contact modified successfully"};
        }catch (e:any){
            logger.error("Contact Service: " + e);
            return {"flag":false,"mess":"Something went wrong"};
        }
    }
    public static async deleteContact(id: number) {
        try{
            const docRef = this.DB.doc(String(id));
            logger.info("Contact Service: Contact deleted");
            return !!await docRef.delete();
        }catch (e:any){
            logger.error("Contact Service: " + e);
            return false;
        }
    }
}
const contactService = new ContactService();
