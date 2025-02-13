import {Gas} from "../interface/gas.interface";

export class MGas implements Gas {
    constructor(
        public id : number,
        public co2_amount: number,
        public timestamp: number
    ) {}
}