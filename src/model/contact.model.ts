import {EmergencyContact} from "../interface/contact.interface";
import { User } from "../interface/user.interface";

export class MEmergencyContact implements EmergencyContact {
    constructor(
        public name: string,
        public phone: string,
        public userId: User
    ) {}

}