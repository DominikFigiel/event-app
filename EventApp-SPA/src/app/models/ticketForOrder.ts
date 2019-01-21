import { Order } from './Order';
import { TicketCategory } from './ticketCategory';

export interface TicketForOrder {
    ticketCategoryId: number;
    price: number;
    soldUnits: number;
    availableUnits: number;
}
