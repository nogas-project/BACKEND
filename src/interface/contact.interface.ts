
// One to many, this is an emergency contact for a user
export interface EmergencyContact {
    id:number,
    name: string;
    email: string;
    userId: number;
}