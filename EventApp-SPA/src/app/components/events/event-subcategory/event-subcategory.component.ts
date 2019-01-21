import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-subcategory',
  templateUrl: './event-subcategory.component.html',
  styleUrls: ['./event-subcategory.component.css']
})
export class EventSubcategoryComponent implements OnInit {
  events: Event[];
  subcategoryId: number;

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCategoryId();
  }

  loadCategoryId() {
    if (this.route.snapshot.params['id']) {
      this.subcategoryId = this.route.snapshot.params['id'];
      this.loadEvents(this.subcategoryId);
    }
  }

  loadEvents(subcategoryId: number) {
    this.eventService.getEventsBySubcategory(this.subcategoryId).subscribe((events: Event[]) => {
      this.events = events;
    }, error => {
      this.alertify.error(error);
    });
  }

}
