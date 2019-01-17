import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-promoter-ended-event-list',
  templateUrl: './promoter-ended-event-list.component.html',
  styleUrls: ['./promoter-ended-event-list.component.css']
})
export class PromoterEndedEventListComponent implements OnInit {
  events?: Event[];

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEndedEventsByPromoter(this.authService.decodedToken.nameid).subscribe((events: Event[]) => {
      this.events = events;
    }, error => {
      this.alertify.error(error);
    });
  }

}
