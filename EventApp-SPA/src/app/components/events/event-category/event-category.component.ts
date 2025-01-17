import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.css']
})
export class EventCategoryComponent implements OnInit {
  events: Event[];
  categoryId: number;

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCategoryId();
  }

  loadCategoryId() {
    if (this.route.snapshot.params['id']) {
      this.categoryId = this.route.snapshot.params['id'];
      this.loadEvents(this.categoryId);
    }
  }

  loadEvents(categoryId: number) {
    this.eventService.getEventsByCategory(this.categoryId).subscribe((events: Event[]) => {
      this.events = events;
    }, error => {
      this.alertify.error(error);
    });
  }

}
