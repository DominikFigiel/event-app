import { AddressForUpdate } from './../../../models/addressForUpdate';
import { AdminService } from './../../../services/admin.service';
import { AlertifyService } from './../../../services/alertify.service';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Venue } from 'src/app/models/venue';
import { BsModalRef } from 'ngx-bootstrap';
import { City } from 'src/app/models/city';
import { ZipCode } from 'src/app/models/zipCode';

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
  zipCodeId: number;

  constructor(public bsModalRef: BsModalRef, public eventService: EventService,
    public adminService: AdminService, public alertify: AlertifyService) { }

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
    // console.log('Edit modal' + JSON.stringify(this.updatedVenue.address));
    this.updatedVenue.address.cityId = this.cityId;
    this.updatedVenue.address.city.id = this.cityId;
    this.updatedVenue.address.city.name = this.getCityName(this.cityId);
    //
      // Sprawdzam czy dany kod pocztowy istnieje w bazie
      this.adminService.getZipCode(this.updatedVenue.address.zipCode.code).subscribe((zipCode: ZipCode) => {
        if (zipCode !== null) {
          console.log(zipCode.code);
          console.log(zipCode.id);
          this.updatedVenue.address.zipCodeId = zipCode.id;
          this.updatedVenue.address.zipCode.id = zipCode.id;
          this.updatedVenue.address.zipCode.code = zipCode.code;
          console.log(JSON.stringify(this.updatedVenue.address));
        } else {
          console.log('null');
          this.alertify.error('Nie ma takiego kodu w bazie');
        }
      }, error => {
        this.alertify.error('Nie ma takiego kodu w bazie');
      });
    //
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
