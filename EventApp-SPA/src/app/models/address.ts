import { City } from './city';
import { ZipCode } from './zipCode';

export interface Address {
    id: number;
    city: City;
    zipCode: ZipCode;
    line1?: string;
    line2?: string;
}
