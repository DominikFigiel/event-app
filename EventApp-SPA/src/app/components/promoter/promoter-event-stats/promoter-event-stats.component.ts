import { AuthService } from './../../../services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { TicketCategory } from 'src/app/models/ticketCategory';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-promoter-event-stats',
  templateUrl: './promoter-event-stats.component.html',
  styleUrls: ['./promoter-event-stats.component.css']
})
export class PromoterEventStatsComponent implements OnInit {
  userId: number;
  eventId: number;
  event: Event;
  ticketCategories: TicketCategory[];

  constructor(private route: ActivatedRoute, private eventService: EventService,
    private router: Router, private alertify: AlertifyService,
    private authService: AuthService) { }

  ngOnInit() {
    this.setEventId();
    this.loadUserId();
    this.loadEvent();
    this.loadTicketCategories();
  }

  loadUserId() {
    this.userId = this.authService.decodedToken.nameid;
  }

  setEventId() {
    if (this.route.snapshot.params['eventId']) {
      this.eventId = this.route.snapshot.params['eventId'];
    }
  }

  loadEvent() {
    this.eventService.getEvent(this.eventId).subscribe((event: Event) => {
      this.event = event;
      if (!event) {
        this.alertify.error('Nie masz dostępu do statystyk tego wydarzenia');
        this.router.navigate(['/promoter/management']);
      }
    }, error => {
      this.alertify.error(error);
      this.router.navigate(['/promoter/management']);
    });
  }

  loadTicketCategories() {
    this.eventService.getEventTicketCategories(this.eventId).subscribe((ticketCategories: TicketCategory[]) => {
      this.ticketCategories = ticketCategories;
    }, error => {
      this.alertify.error(error);
    });
  }

}
