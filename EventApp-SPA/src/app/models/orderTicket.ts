import { Order } from './Order';
import { TicketCategory } from './ticketCategory';

export interface OrderTicket {
    id: number;
    order: Order;
    ticketCategory: TicketCategory;
    soldUnits: number;
}
