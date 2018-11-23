import { Order } from './Order';
import { Event } from './Event';

export interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    email: string;
    dateOfBirth: Date;
    photoURL: string;
    registrationDate: Date;
    companyName?: string;
    roles?: string[];
    orders?: Order[];
    events?: Event[];
}
