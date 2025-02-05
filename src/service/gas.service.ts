import {MGas} from "../model/gas.model";
import db from "../util/database.util";
import {config} from "../config/config";

class GasService {
    database = db;
    async latestInfo() {
        let co2_amount, timestamp;
        const query = await db.collection("Gas").orderBy("timestamp", "desc").limit(1).get();
        if(!query.empty){
            query.docs.map(value=>{
                co2_amount = value.data().co2_amount;
                timestamp = value.data().timestamp;
            })
            // @ts-ignore
            return new MGas(co2_amount, timestamp);
        }
        else return null;
    }
    async getHistory(){
        let result = new Array<MGas>();
        const query = await db.collection("Gas").get();
        if(!query.empty){
            query.docs.map(value=>{
                result.push(new MGas(value.data().co2_amount, value.data().timestamp));
            })
            return result;
        }
        else return null;
    }
    async addData(co2_amount: number) {
        try{
            const snapshot = await db.collection("Gas").count().get();
            const id = snapshot.data().count;
            const docRef = db.collection("Gas").doc(String(id));
            let timestamp = Date.now();
            const newData = new MGas(co2_amount,timestamp);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newData)));
            return !!flag.writeTime;
        }catch (e:any){
            console.error(e);
            return false;
        }
    }
}
const gasService = new GasService();
//test add new gas data
// gasService.addData(103).then(r => console.log(r));
// get the latest info
// gasService.latestInfo().then(result => console.log(result));
gasService.getHistory().then(r => console.log(r));