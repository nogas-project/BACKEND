import {MGas} from "../model/gas.model";
import {dbConfig} from "../config/config.db";
import {loggerService as logger} from "../util/logger.util";

export class GasService {
    private static DB = dbConfig.COL_GAS;
    public static async latestInfo() {
        try {
            let id, co2_amount, timestamp;
            const query = await this.DB.orderBy("timestamp", "desc").limit(1).get();
            if (!query.empty) {
                query.docs.map(value => {
                    id = value.data().id;
                    co2_amount = value.data().co2_amount;
                    timestamp = value.data().timestamp;
                })
                logger.info("Gas Service: latest data retrieved");
                return new MGas(id!, co2_amount!, timestamp!);
            } else {
                logger.info("Gas Service: latest data not retrieved");
                return null;
            }
        }catch (e) {
            logger.error("Gas Service: " + e);
            return null;
        }
    }
    public static async getHistory(){
        try{
        let result = new Array<MGas>();
        const query = await this.DB.get();
        if(!query.empty){
            query.docs.map(value=>{
                result.push(new MGas(value.data().id,value.data().co2_amount, value.data().timestamp));
            })
            logger.info("Gas Service: history data retrieved");
            return result;
        }
        else {
            logger.error("Gas Service: history data not retrieved");
            return null;
        }
        }catch (e) {
            logger.error("Gas Service: " + e);
            return null;
        }
    }
    public static async addData(co2_amount: number) {
        try{
            const snapshot = await this.DB.count().get();
            const id = snapshot.data().count;
            const docRef = this.DB.doc(String(id));
            let timestamp = Date.now();
            const newData = new MGas(id,co2_amount,timestamp);
            const flag = await docRef.set(JSON.parse(JSON.stringify(newData)));
            logger.info("Gas Service: data added");
            return !!flag.writeTime;
        }catch (e:any){
            logger.error("Gas Service: " + e);
            return false;
        }
    }
    public static async deleteData(id: string) {
        try{
            const docRef = this.DB.doc(id);
            logger.info("Gas Service: data deleted");
            return !!await docRef.delete();
        }catch (e:any){
            logger.error("Gas Service: " + e);
            return false;
        }
    }
}
const gasService = new GasService();
