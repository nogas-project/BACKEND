import {MEmergencyContact} from "../model/contact.model";
import db, {db_contact} from "../util/database.util";

class ContactService {
    async getContacts(userId:number) {
        let result = new Array<MEmergencyContact>();
        const query = await db_contact.where("userId", "==", userId).get();
        if(!query.empty){
            query.docs.map(value=>{
                result.push(new MEmergencyContact(value.data().name,value.data().phone, value.data().userId));
            })
            return result;
        }
        else return null;
    }
    async addContact(name: string, phone: string, userId: number) {
        try{
            //Check if user already have 3 contacts
            const snapshot = await db_contact.where("userId", '==', userId).count().get();
            const count = snapshot.data().count;
            if(count == 3) return false;
            //Check if the new contact does not already exist
            const ss = await db_contact.where("userId", '==', userId).where("phone", '==', phone).count().get();
            const total = ss.data().count;
            if(total == 1) return false;

            const sp = await db_contact.count().get();
            const id = sp.data().count;
            const docRef = db_contact.doc(String(id));
            const newData = new MEmergencyContact(name, phone, userId);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newData)));

            return !!flag.writeTime;
        }catch (e:any){
            console.error(e);
            return false;
        }
    }
    async modifyContact(name: string, phone: string, userId: number, id: number) {
        try{
            //Check if the new contact does not already exist
            const ss = await db_contact.where("userId", '==', userId).where("phone", '==', phone).count().get();
            const total = ss.data().count;
            if(total == 1) return false;

            const sp = await db_contact.count().get();
            const id = sp.data().count;
            const docRef = db_contact.doc(String(id));
            const newData = new MEmergencyContact(name, phone, userId);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newData)));

            return !!flag.writeTime;
        }catch (e:any){
            console.error(e);
            return false;
        }
    }
    async deleteContact(id: string) {
        try{
            const docRef = db_contact.doc(String(id));
            await docRef.delete();

        }catch (e:any){
            console.error(e);
            return false;
        }
    }
}
const contactService = new ContactService();
// test ajout de contact true
// contactService.addContact("John", "438-978-9012", 1).then(result => console.log(result));
// contactService.addContact("John", "514-896-0904", 1).then(result => console.log(result));
// test ajout contact false
// contactService.addContact("John", "438-978-9012", 1).then(result => console.log(result));
// contactService.addContact("Jerry", "438-978-9012", 1).then(result => console.log(result))
// test get contacts
contactService.getContacts(1).then(contacts => console.log(contacts));