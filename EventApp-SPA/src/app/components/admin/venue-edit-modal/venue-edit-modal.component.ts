import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Venue } from 'src/app/models/venue';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-venue-edit-modal',
  templateUrl: './venue-edit-modal.component.html',
  styleUrls: ['./venue-edit-modal.component.css']
})
export class VenueEditModalComponent implements OnInit {
  @Output() updateVenue = new EventEmitter;
  venue: Venue;
  venueName: any;
  venueDescription: any;
  venuePhotoUrl: any;
  venueCity: any;
  venueZipCode: any;
  venueLine1: any;
  venueLine2: any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.venueName = this.venue.name;
    this.venueDescription = this.venue.description;
    this.venuePhotoUrl = this.venue.photoUrl;
    this.venueCity = this.venue.address.city.name;
    this.venueZipCode = this.venue.address.zipCode.code;
    this.venueLine1 = this.venue.address.line1;
    this.venueLine2 = this.venue.address.line2;
  }

  update() {
    this.updateVenue.emit(this.venueName);
    this.bsModalRef.hide();
  }

}
