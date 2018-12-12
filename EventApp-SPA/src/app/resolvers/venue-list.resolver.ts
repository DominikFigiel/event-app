import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventService } from '../services/event.service';
import { Venue } from '../models/venue';

@Injectable()
export class VenueListResolver implements Resolve<Venue[]> {
    constructor(private eventService: EventService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Venue[]> {
        return this.eventService.getVenues().pipe(
            catchError(error => {
                this.alertify.error('Podczas odczytu danych wystąpił problem. ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
