import { TicketCategory } from './../models/ticketCategory';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventService } from '../services/event.service';

@Injectable()
export class TicketCategoryResolver implements Resolve<TicketCategory> {
    constructor(private eventService: EventService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TicketCategory> {
        return this.eventService.getEventTicketCategories(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Podczas odczytu danych wystąpił problem. ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
