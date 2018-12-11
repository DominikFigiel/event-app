import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { City } from 'src/app/models/city';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-city-edit-modal',
  templateUrl: './city-edit-modal.component.html',
  styleUrls: ['./city-edit-modal.component.css']
})
export class CityEditModalComponent implements OnInit {
  @Output() updateCity = new EventEmitter;
  city: City;
  cityName: any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.cityName = this.city.name;
  }

  update() {
    this.updateCity.emit(this.cityName);
    this.bsModalRef.hide();
  }

}
