import {config} from "./config";
import {db_contact, db_contact_test, db_gas, db_gas_test, db_user, db_user_test} from "../util/database.util";

export const dbConfig = {
    COL_USER: config.ENV == 'development' ? db_user: db_user_test,
    COL_GAS: config.ENV == 'development' ? db_gas: db_gas_test,
    COL_CONTACT: config.ENV == 'development' ? db_contact : db_contact_test,
}