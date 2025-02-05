import {EmergencyContact} from "../interface/contact.interface";

export class MEmergencyContact implements EmergencyContact {
    constructor(
        public name: string,
        public phone: string,
        public userId: number
    ) {}

}