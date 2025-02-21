import {EmergencyContact} from "../interface/contact.interface";

export class MEmergencyContact implements EmergencyContact {
    constructor(
        public id : number,
        public name: string,
        public email: string,
        public userId: number,
    ) {}

}