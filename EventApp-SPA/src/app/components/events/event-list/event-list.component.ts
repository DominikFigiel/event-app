import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { Pagination, PaginatedResult } from 'src/app/models/pagination';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];
  eventParams: any = {};
  pagination: Pagination;
  promotedEvent: Event;

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.events = data['events'].result;
      this.pagination = data['events'].pagination;
    });

    this.eventParams.orderBy = 'created';
    this.loadPromotedEvent();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadEvents();
  }

  loadEvents() {
    this.eventService
      .getEvents(this.pagination.currentPage, this.pagination.itemsPerPage, this.eventParams)
      .subscribe(
        (res: PaginatedResult<Event[]>) => {
          this.events = res.result;
          this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadPromotedEvent() {
    this.eventService.getPromotedEvent().subscribe((event: Event) => {
      this.promotedEvent = event;
    }, error => {
      this.alertify.error(error);
    });
  }

}
