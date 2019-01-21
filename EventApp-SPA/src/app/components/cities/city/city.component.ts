import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  events: Event[];
  cityId: number;

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCategoryId();
  }

  loadCategoryId() {
    if (this.route.snapshot.params['id']) {
      this.cityId = this.route.snapshot.params['id'];
      this.loadEvents(this.cityId);
    }
  }

  loadEvents(cityId: number) {
    this.eventService.getEventsByCity(this.cityId).subscribe((events: Event[]) => {
      this.events = events;
    }, error => {
      this.alertify.error(error);
    });
  }
}
