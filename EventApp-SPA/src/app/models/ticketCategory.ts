export interface TicketCategory {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    soldUnits: number;
    event: Event;
}
