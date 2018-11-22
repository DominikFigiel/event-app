import { Address } from './address';


export interface Venue {
    id: number;
    name: string;
    description: string;
    photoUrl: string;
    address: Address;
}
