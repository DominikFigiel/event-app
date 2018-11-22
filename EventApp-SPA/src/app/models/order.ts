import { User } from './user';
import { Status } from './status';

export interface Order {
    id: number;
    status: Status;
    user: User;
}
