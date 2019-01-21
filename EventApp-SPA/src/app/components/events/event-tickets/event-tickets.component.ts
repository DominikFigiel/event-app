import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { TicketCategory } from 'src/app/models/ticketCategory';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/Event';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderTicket } from 'src/app/models/orderTicket';
import { TicketForOrder } from 'src/app/models/ticketForOrder';

@Component({
  selector: 'app-event-tickets',
  templateUrl: './event-tickets.component.html',
  styleUrls: ['./event-tickets.component.css']
})
export class EventTicketsComponent implements OnInit {
  ticketCategories: TicketCategory[];
  event: Event;
  ticketsForOrder: TicketForOrder[] = [];
  orderTotalAmount: number;
  todayDate: Date;
  eventDate: Date;
  validation: boolean;

  constructor(private alertify: AlertifyService,
    private route: ActivatedRoute, private eventService: EventService,
    private fb: FormBuilder, private authService: AuthService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.ticketCategories = data['ticketCategories'];
      this.event = data['event'];
    });
    this.addTicketCategoriesToOrder();
    this.orderTotalAmount = 0;
    this.todayDate = new Date();
    this.eventDate =  new Date(this.event.date);
    this.validation = false;
    this.resetTicketsForOrder();
  }

  eventEnded() {
    if (this.eventDate.getFullYear() > this.todayDate.getFullYear()) {
      return false;
    } else if (this.eventDate.getFullYear() === this.todayDate.getFullYear()) {
      if (this.eventDate.getMonth() > this.todayDate.getMonth()) {
        return false;
      } else if (this.eventDate.getMonth() === this.todayDate.getMonth()) {
        if (this.eventDate.getDate() > this.todayDate.getDate()) {
          return false;
        } else if (this.eventDate.getDate() === this.todayDate.getDate()) {
          return true;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  resetTicketsForOrder() {
    if (this.ticketsForOrder && this.ticketsForOrder.length > 0) {
      this.ticketsForOrder.forEach(element => {
        element.soldUnits = 0;
      });
    }
  }

  soldUnits() {
    let soldUnits = 0;
    if (this.ticketsForOrder && this.ticketsForOrder.length > 0) {
      this.ticketsForOrder.forEach(element => {
        soldUnits += element.soldUnits;
      });
    }
    return soldUnits;
  }

  orderContainsMoreUnitsThanAvailable(): boolean {
    let limitExceeded = false;
    if (this.ticketsForOrder && this.ticketsForOrder.length > 0) {
      this.ticketsForOrder.forEach(element => {
        // if (element.soldUnits > (this.ticketCategories[index].quantity - this.ticketCategories[index].soldUnits))
        if (element.soldUnits > element.availableUnits) {
          console.log('containsmore -> true');
          limitExceeded = true;
        }
      });
    }
    return limitExceeded;

  }

  addOrder() {
    this.userService.addOrder(this.authService.decodedToken.nameid).subscribe((createdOrderId: number) => {
      this.alertify.success('Zamówienie zostało złożone.');
      console.log('Id utworzonego zamowienia:' + createdOrderId);
      this.orderTotalAmount = 0;
      // dodawanie orderTickets do  bazy
      this.ticketsForOrder.forEach(element => {
        if (element.soldUnits > 0) {
          this.userService.addOrderTicket(createdOrderId, element.ticketCategoryId, element.soldUnits)
            .subscribe((createdOrderTicketId: number) => {
              console.log('OrderTotalAmount' + this.orderTotalAmount);
              console.log('SoldUnits' + element.soldUnits);
              console.log('Price' + element.price);
              this.orderTotalAmount  += (element.soldUnits * element.price);
              this.alertify.success('Bilety typu zostały dodane do zamówienia.');
              console.log('Suma przed aktualizacją zamowienia:' + this.orderTotalAmount );
              if (this.orderTotalAmount  > 0) {
                console.log('OrderTotalAmount' + this.orderTotalAmount);
                this.userService.updateOrderTotalAmount(createdOrderId, this.orderTotalAmount )
                .subscribe((totalAmount: number) => {
                  this.alertify.success('Kwota łączna zamówienia została zaktualizowana.' + totalAmount);
                  this.eventService.getEventTicketCategories(this.event.id).subscribe(
                    (ticketCategories: TicketCategory[]) => {
                      this.ticketCategories = ticketCategories;
                      this.router.navigate(['/users/', this.authService.decodedToken.nameid]);
                    }, error => {
                      this.alertify.error(error);
                    });
                }, error => {
                  this.showErrorNotificationsFromRequest(error);
                });
              }
          }, error => {
            this.showErrorNotificationsFromRequest(error);
          });
        }
      });
    }, error => {
      this.showErrorNotificationsFromRequest(error);
    });
  }

  changeSoldUnits(categoryId: number, numberOfTickets: number) {
    console.log('onchange');
    const index = this.ticketsForOrder.findIndex(o => o.ticketCategoryId === categoryId);
    this.ticketsForOrder[index].soldUnits = numberOfTickets;
    if (numberOfTickets > this.ticketsForOrder[index].availableUnits) {
      // this.ticketsForOrder[index].soldUnits = numberOfTickets;
      this.alertify.error('Przekroczono maksymalną liczbę biletów danego typu: ' + this.ticketCategories[index].name);
      this.validation = false;
    } else {
      console.log('wchodzi do else');
      // tutaj sprawdzamy wszystkie
      const limitExceeded = this.orderContainsMoreUnitsThanAvailable();
      console.log('przekroczono zakres: ' + limitExceeded);
      if (limitExceeded) {
        console.log('wchodzi do validation false');
        this.validation = false;
      } else {
        console.log('wchodzi do validation true');
        this.validation = true;
      }
    }


  }

  addTicketCategoriesToOrder() {
    this.ticketCategories.forEach(element => {
      const orderTicket = {
          'ticketCategoryId': element.id,
          'price': element.price,
          'soldUnits': element.soldUnits,
          'availableUnits': element.quantity - element.soldUnits
      };
      this.ticketsForOrder.push(orderTicket);
    });
  }

  showErrorNotificationsFromRequest(errorString) {
    const errors = errorString.split('\n');
    for (let i = 0; i < errors.length; i++) {
      if (errors[i] !== '') {
        if (errors[i].charAt(0) === ',') {
          this.alertify.error(errors[i].slice(1, errors[i].length));
        } else {
          this.alertify.error(errors[i]);
        }
      }
    }
  }

}
