import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { City } from 'src/app/models/city';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AdminService } from 'src/app/services/admin.service';
import { CityEditModalComponent } from '../city-edit-modal/city-edit-modal.component';

@Component({
  selector: 'app-city-management-list',
  templateUrl: './city-management-list.component.html',
  styleUrls: ['./city-management-list.component.css']
})
export class CityManagementListComponent implements OnInit, OnChanges {
  @Input() reloadCityList;
  cities: City[];
  bsModalRef: BsModalRef;

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

  editCity(city: City) {
    const initialState = {
      city
    };
    this.bsModalRef = this.modalService.show(CityEditModalComponent, {initialState});
    this.bsModalRef.content.updateCity.subscribe((cityName) => {
      const newCityName = cityName;
      if (newCityName && newCityName !== '' && newCityName !== city.name) {
        city.name = cityName;
        this.adminService.updateCity(city).subscribe(next => {
          this.alertify.success('Zmiany zostały zapisane.');
        }, error => {
          this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
        });
      }
    });
  }

  deleteCityOnConfirm(cityId: number) {
    this.alertify.confirm('Usuwanie miasta', 'Chcesz usunąć to miasto?', () => this.deleteCity(cityId));
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
