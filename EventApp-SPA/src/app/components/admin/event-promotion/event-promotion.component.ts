import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AdminService } from 'src/app/services/admin.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-promotion',
  templateUrl: './event-promotion.component.html',
  styleUrls: ['./event-promotion.component.css']
})
export class EventPromotionComponent implements OnInit {
  publishedEvents: Event[];

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.loadPublishedEvents();
  }

  loadPublishedEvents() {
    this.eventService.getPublishedEvents().subscribe((publishedEvents: Event[]) => {
      this.publishedEvents = publishedEvents;
    }, error => {
      this.alertify.error(error);
    });
  }

  promoteEventOnConfirm(eventId: number) {
    this.alertify.confirm('Promowanie wydarzenia', 'Chcesz ustawić to wydarzenie jako promowane?', () => this.promoteEvent(eventId));
  }

  promoteEvent(eventId: number) {
    this.adminService.promoteEvent(eventId).subscribe(next => {
      this.alertify.success('Wydarzenie zostało oznaczone jako promowane.');
      this.loadPublishedEvents();
    }, error => {
      this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
    });
  }

}
