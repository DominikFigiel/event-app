import { AlertifyService } from './../../../services/alertify.service';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Venue } from 'src/app/models/venue';
import { BsModalRef } from 'ngx-bootstrap';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-venue-edit-modal',
  templateUrl: './venue-edit-modal.component.html',
  styleUrls: ['./venue-edit-modal.component.css']
})
export class VenueEditModalComponent implements OnInit {
  @Output() updateVenue = new EventEmitter;
  venue: Venue;
  updatedVenue: any;
  venueName: any;
  venueDescription: any;
  venuePhotoUrl: any;
  venueCity: any;
  venueZipCode: any;
  venueLine1: any;
  venueLine2: any;
  cities: City[];
  selectedCity: string;
  cityId: number;

  constructor(public bsModalRef: BsModalRef, public eventService: EventService, public alertify: AlertifyService) { }

  ngOnInit() {
    this.updatedVenue = this.venue;
    this.venueName = this.venue.name;
    this.venueDescription = this.venue.description;
    this.venuePhotoUrl = this.venue.photoUrl;
    this.venueCity = this.venue.address.city.name;
    this.venueZipCode = this.venue.address.zipCode.code;
    this.venueLine1 = this.venue.address.line1;
    this.venueLine2 = this.venue.address.line2;
    this.cityId = this.venue.address.city.id;
    this.loadCities();
  }

  update() {
    console.log('Edit modal' + JSON.stringify(this.updatedVenue.address));
    this.updatedVenue.address.cityId = this.cityId;
    this.updatedVenue.address.city.name = this.getCityName(this.cityId);
    this.updateVenue.emit(this.updatedVenue);
    this.bsModalRef.hide();
  }

  loadCities() {
    this.eventService.getCities().subscribe((cities: City[]) => {
      this.cities = cities;
    }, error => {
      this.alertify.error(error);
    });
  }

  getCityName(id: number) {
    return this.cities.filter(x => x.id === id)[0].name;
  }
}
