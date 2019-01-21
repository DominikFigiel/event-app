import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Order } from '../models/Order';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/');
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  getOrdersByUser(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'users/ordersByUser/' + userId);
  }

  getUnpaidOrdersByUser(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'users/unpaidOrdersByUser/' + userId);
  }

  addOrder(userId: number) {
    return this.http.post(this.baseUrl + 'users/addOrder/' + userId, userId);
  }

  addOrderTicket(createdOrderId: number, ticketCatId: number, soldUnits: number) {
    return this.http.post(this.baseUrl + 'users/addOrderTicket/' + createdOrderId + '/' + ticketCatId  + '/' + soldUnits, createdOrderId);
  }

  updateOrderTotalAmount(createdOrderId: number, orderTotalAmount: number) {
    return this.http.put(this.baseUrl + 'users/updateOrderTotalAmount/' + createdOrderId + '/' + orderTotalAmount, createdOrderId);
  }

  successfulPayment(orderId: number) {
    return this.http.put(this.baseUrl + 'users/successfulPayment/' + orderId, orderId);
  }

}
