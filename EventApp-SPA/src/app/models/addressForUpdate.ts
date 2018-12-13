import { City } from './city';
import { ZipCode } from './zipCode';

export interface AddressForUpdate {
    id: number;
    cityId: number;
    zipCodeId: number;
    line1?: string;
    line2?: string;
}
