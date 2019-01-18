import { AdminService } from './../../../services/admin.service';
import { AuthService } from './../../../services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-promoter-event-list',
  templateUrl: './promoter-event-list.component.html',
  styleUrls: ['./promoter-event-list.component.css']
})
export class PromoterEventListComponent implements OnInit {
  events?: Event[];

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private authService: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEventsByPromoter(this.authService.decodedToken.nameid).subscribe((events: Event[]) => {
      this.events = events;
    }, error => {
      this.alertify.error(error);
    });
  }

}
