import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  orders: Order[];
  unpaidOrders: Order[];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      if (this.user.id !== +this.authService.decodedToken.nameid) {
        this.router.navigate(['/']);
        this.alertify.error('Nie masz dostępu do tej podstrony.');
      }
      this.loadOrders();
      this.loadUnpaidOrders();
    });
  }

  successfulPayment(orderId: number) {
    this.userService.successfulPayment(orderId).subscribe(() => {
      this.alertify.success('Zamówienie zostało opłacone.');
      this.loadOrders();
      this.loadUnpaidOrders();
    }, error => {
      this.alertify.error(error);
    });
  }

  loadOrders() {
    this.userService.getOrdersByUser(+this.route.snapshot.params['id']).subscribe((orders: Order[]) => {
      this.orders = orders;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadUnpaidOrders() {
    this.userService.getUnpaidOrdersByUser(+this.route.snapshot.params['id']).subscribe((orders: Order[]) => {
      this.unpaidOrders = orders;
    }, error => {
      this.alertify.error(error);
    });
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
