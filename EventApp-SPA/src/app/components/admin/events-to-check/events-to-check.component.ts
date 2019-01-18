import { AlertifyService } from './../../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-events-to-check',
  templateUrl: './events-to-check.component.html',
  styleUrls: ['./events-to-check.component.css']
})
export class EventsToCheckComponent implements OnInit {
  finishedEvents: Event[];

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.loadFinishedEvents();
  }

  loadFinishedEvents() {
    this.eventService.getFinishedEventsToCheck().subscribe((finishedEvents: Event[]) => {
      this.finishedEvents = finishedEvents;
    }, error => {
      this.alertify.error(error);
    });
  }

  rejectEventOnConfirm(eventId: number) {
    this.alertify.confirm('Odrzuć wydarzenie', 'Chcesz odrzucić to wydarzenie?', () => this.rejectEvent(eventId));
  }

  rejectEvent(eventId: number) {
    this.adminService.rejectEvent(eventId).subscribe(next => {
      this.alertify.success('Wydarzenie zostało odrzucone.');
      this.loadFinishedEvents();
    }, error => {
      this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
    });
  }

}
