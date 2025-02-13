import {User} from "../interface/user.interface";

export class MUser implements User {
    constructor(
        public id :number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public phone: string,
        public isAdmin: boolean
    ) {}
}