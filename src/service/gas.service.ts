import {MGas} from "../model/gas.model";
import {dbConfig} from "../config/config.db";

export class GasService {
    private static DB = dbConfig.COL_GAS;
    public static async latestInfo() {
        let id,co2_amount, timestamp;
        const query = await this.DB.orderBy("timestamp", "desc").limit(1).get();
        if(!query.empty){
            query.docs.map(value=>{
                id = value.data().id;
                co2_amount = value.data().co2_amount;
                timestamp = value.data().timestamp;
            })
            return new MGas(id!, co2_amount!, timestamp!);
        }
        else return null;
    }
    public static async getHistory(){
        let result = new Array<MGas>();
        const query = await this.DB.get();
        if(!query.empty){
            query.docs.map(value=>{
                result.push(new MGas(value.data().id,value.data().co2_amount, value.data().timestamp));
            })
            return result;
        }
        else return null;
    }
    public static async addData(co2_amount: number) {
        try{
            const snapshot = await this.DB.count().get();
            const id = snapshot.data().count;
            const docRef = this.DB.doc(String(id));
            let timestamp = Date.now();
            const newData = new MGas(id,co2_amount,timestamp);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newData)));
            return !!flag.writeTime;
        }catch (e:any){
            console.error(e);
            return false;
        }
    }
    public static async deleteData(id: string) {
        try{
            const docRef = this.DB.doc(id);
            return !!await docRef.delete();
        }catch (e:any){
            console.error(e);
            return false;
        }
    }
}
const gasService = new GasService();
