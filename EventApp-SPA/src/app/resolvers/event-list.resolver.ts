import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EventListResolver implements Resolve<Event[]> {
    pageNumber = 1;
    pageSize = 3;

    constructor(private eventService: EventService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Event[]> {
        return this.eventService.getEvents(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Podczas odczytu danych wystąpił problem. ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
