import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  eventDate: Date;
  todayDate: Date;

  constructor(private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.event = data['event'];
    });
    this.todayDate = new Date();
    this.eventDate =  new Date(this.event.date);
  }

  eventEnded() {
    if (this.eventDate.getFullYear() > this.todayDate.getFullYear()) {
      return false;
    } else if (this.eventDate.getFullYear() === this.todayDate.getFullYear()) {
      if (this.eventDate.getMonth() > this.todayDate.getMonth()) {
        return false;
      } else if (this.eventDate.getMonth() === this.todayDate.getMonth()) {
        if (this.eventDate.getDate() > this.todayDate.getDate()) {
          return false;
        } else if (this.eventDate.getDate() === this.todayDate.getDate()) {
          return true;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

}
