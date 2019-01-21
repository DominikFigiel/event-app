import { UserService } from './../../../services/user.service';
import { AlertifyService } from './../../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { OrderTicket } from 'src/app/models/orderTicket';
import { Order } from 'src/app/models/Order';
import { Event } from 'src/app/models/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.css']
})
export class UserOrderDetailComponent implements OnInit {
  userId: number;
  orderId: number;
  order: Order;
  orderTickets: OrderTicket[];
  ticketsSoldInTotal: number;
  totalAmount: number;
  event: Event;

  constructor(private route: ActivatedRoute, private userService: UserService,
    private router: Router, private alertify: AlertifyService,
    private authService: AuthService) { }

  ngOnInit() {
    this.setOrderId();
    this.loadUserId();
    this.loadOrderTickets();
    this.ticketsSoldInTotal = 0;
    this.totalAmount = 0;
  }

  loadUserId() {
    this.userId = this.authService.decodedToken.nameid;
  }

  setOrderId() {
    if (this.route.snapshot.params['id']) {
      this.orderId = this.route.snapshot.params['id'];
    }
  }

  loadOrderTickets() {
    this.userService.getOrderTickets(this.orderId).subscribe((orderTickets: OrderTicket[]) => {
      this.orderTickets = orderTickets;

      orderTickets.forEach(element => {
        this.ticketsSoldInTotal += element.soldUnits;
        this.totalAmount += (element.soldUnits * element.ticketCategory.price);
      });
    }, error => {
      this.alertify.error(error);
    });
  }

}
