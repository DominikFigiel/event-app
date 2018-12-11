import { BsModalService } from 'ngx-bootstrap';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { City } from 'src/app/models/city';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-city-management-list',
  templateUrl: './city-management-list.component.html',
  styleUrls: ['./city-management-list.component.css']
})
export class CityManagementListComponent implements OnInit, OnChanges {
  @Input() reloadCityList;
  cities: City[];

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loadCities();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadCities();
  }

  loadCities() {
    this.eventService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteCityOnConfirm(cityId: number) {
    this.alertify.confirm('Usuwanie kategorii', 'Chcesz usunąć to miasto?', () => this.deleteCity(cityId));
  }

  deleteCity(cityId: number) {
    this.adminService.deleteCity(cityId).subscribe(next => {
      this.alertify.message('Miasto zostało usunięte.');
      this.loadCities();
    }, error => {
      this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
    });
  }

}
