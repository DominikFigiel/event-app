import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-management',
  templateUrl: './city-management.component.html',
  styleUrls: ['./city-management.component.css']
})
export class CityManagementComponent implements OnInit {
  reloadCityList: boolean;

  constructor() { }

  ngOnInit() {
    this.reloadCityList = false;
  }

  onSelectCityList() {
    this.reloadCityList = !this.reloadCityList;
  }

}
