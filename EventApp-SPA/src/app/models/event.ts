import { User } from './user';
import { Image } from './image';
import { Venue } from './venue';
export interface Event {
    id: number;
    name: string;
    description: string;
    venue: Venue;
    date: Date;
    created: Date;
    photoUrl?: string;
    approved: boolean;
    images?: Image[];
    user: User;
}
