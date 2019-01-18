import { TicketCategory } from './ticketCategory';
import { User } from './user';
import { Image } from './image';
import { Venue } from './venue';
import { Subcategory } from './subcategory';

export interface Event {
    id: number;
    name: string;
    headline: string;
    description: string;
    venue: Venue;
    date: Date;
    created: Date;
    photoURL?: string;
    finished: boolean;
    approved: boolean;
    rejected: boolean;
    images?: Image[];
    user: User;
    subcategory: Subcategory;
    ticketCategories?: TicketCategory[];
}
