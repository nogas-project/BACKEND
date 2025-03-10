export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    emergency_contacts: {
        name: string;
        phone: string;
    }
}