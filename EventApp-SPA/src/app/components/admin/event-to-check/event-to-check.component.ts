import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AdminService } from 'src/app/services/admin.service';
import { Event } from 'src/app/models/event';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-to-check',
  templateUrl: './event-to-check.component.html',
  styleUrls: ['./event-to-check.component.css']
})
export class EventToCheckComponent implements OnInit {
  eventId: number;
  event: Event;

  constructor(private route: ActivatedRoute, private eventService: EventService,
    private alertify: AlertifyService, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.setEventId();
    this.loadFinishedEvent();
  }

  approveEventOnConfirm(eventId: number) {
    this.alertify.confirm('Opublikuj wydarzenie', 'Chcesz opublikować to wydarzenie?', () => this.approveEvent(eventId));
  }

  approveEvent(eventId: number) {
    this.adminService.approveEvent(eventId).subscribe(next => {
      this.alertify.success('Wydarzenie zostało opublikowane.');
      // przekieruj na admin/approval
      this.router.navigate(['/admin/approval']);
    }, error => {
      this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
    });
  }

  rejectEventOnConfirm(eventId: number) {
    this.alertify.confirm('Odrzuć wydarzenie', 'Chcesz odrzucić to wydarzenie?', () => this.rejectEvent(eventId));
  }

  rejectEvent(eventId: number) {
    this.adminService.rejectEvent(eventId).subscribe(next => {
      this.alertify.success('Wydarzenie zostało odrzucone.');
      // przekieruj na admin/approval
      this.router.navigate(['/admin/approval']);
    }, error => {
      this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
    });
  }

  setEventId() {
    if (this.route.snapshot.params['eventId']) {
      this.eventId = this.route.snapshot.params['eventId'];
    }
  }

  loadFinishedEvent() {
      this.eventService.getEvent(this.eventId).subscribe((finishedEvent: Event) => {
        if (finishedEvent) {
        this.event = finishedEvent;
        } else {
          this.router.navigate(['/admin/approval']);
          this.alertify.error('Nie znaleziono wydarzenia');
        }
      }, error => {
        this.alertify.error(error);
      });
  }

}
