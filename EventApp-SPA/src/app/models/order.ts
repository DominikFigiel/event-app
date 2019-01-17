import { User } from './user';
import { Status } from './status';
import { OrderTicket } from './orderTicket';

export interface Order {
    id: number;
    status: Status;
    user: User;
    totalAmount?: number;
    orderDate?: Date;
    paymentDate?: Date;
    orderTickets?: OrderTicket[];
}
