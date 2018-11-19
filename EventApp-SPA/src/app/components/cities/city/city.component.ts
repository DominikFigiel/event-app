import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.http.get('http://localhost:5000/api/cities').subscribe(response => {
      this.cities = response;
    }, error => {
      console.log(error);
    });
  }
}
