import { User } from './user';
import { Image } from './image';
import { Venue } from './venue';

export interface Event {
    id: number;
    name: string;
    headline: string;
    description: string;
    venue: Venue;
    date: Date;
    created: Date;
    photoURL?: string;
    approved: boolean;
    images?: Image[];
    user: User;
}
