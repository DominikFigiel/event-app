import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[];

  constructor(private eventService: EventService, private alertify: AlertifyService) { }


  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.eventService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    }, error => {
      this.alertify.error(error);
    });
  }
}
