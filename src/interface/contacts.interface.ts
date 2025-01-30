import {User} from "./user.interface";

// One to many, this is an emergency contact for a user
export interface EmergencyContact {
    name: string;
    phone: string;
    userId: User;
}