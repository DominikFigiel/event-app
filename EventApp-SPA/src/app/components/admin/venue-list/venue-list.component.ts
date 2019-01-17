import { ZipCode } from './../../../models/zipCode';
import { Address } from './../../../models/address';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Venue } from 'src/app/models/venue';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AdminService } from 'src/app/services/admin.service';
import { VenueEditModalComponent } from '../venue-edit-modal/venue-edit-modal.component';
import { ActivatedRoute } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit, OnChanges {
  @Input() reloadVenueList;
  venues: Venue[];
  bsModalRef: BsModalRef;
  addressForUpdate: any;

  constructor(private eventService: EventService, private alertify: AlertifyService, private adminService: AdminService,
    private modalService: BsModalService, private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
        this.venues = data['venues'];
      });
    }

    ngOnChanges(changes: SimpleChanges) {
      this.loadVenues();
    }

    loadVenues() {
      this.eventService.getVenues().subscribe((venues: Venue[]) => {
        this.venues = venues;
      }, error => {
        this.alertify.error(error);
      });
    }

    editVenue(venue: Venue) {
      const venueBeforeChanges = Object.assign({}, venue);
      const addressBeforeChanges = Object.assign({}, venue.address);
      const cityBeforeChanges = Object.assign({}, venue.address.city);

      const initialState = {
        venue
      };
      console.log(JSON.stringify(venue.address));
      this.bsModalRef = this.modalService.show(VenueEditModalComponent, {initialState});
      this.bsModalRef.content.updateVenue.subscribe((updatedVenue) => {
        console.log('Before:' + JSON.stringify(venueBeforeChanges.description));
        console.log('After:' + JSON.stringify(venue.description));
        // console.log('City before:' + JSON.stringify(cityBeforeChanges.id));
        if (venue.name !== venueBeforeChanges.name || venue.description !== venueBeforeChanges.description) {
          this.adminService.updateVenue(venue).subscribe(next => {
            this.alertify.success('Dane obiektu zostały zapisane.');
          }, error => {
            this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
          });
        }

        if (venue.address.line1 !== addressBeforeChanges.line1 || venue.address.line2 !== addressBeforeChanges.line2
              || venue.address.city.id !== cityBeforeChanges.id) {

          console.log('venue.address:' + JSON.stringify(venue.address));
          console.log('venue.address.id:' + JSON.stringify(venue.address.id));
          this.addressForUpdate = venue.address;

          this.adminService.updateAddress(this.addressForUpdate).subscribe(next => {
            console.log('venue.addressSukces:' + JSON.stringify(venue.address));
            this.alertify.success('Nowy adres został zapisany.');
          }, error => {
            console.log('venue.addressError:' + JSON.stringify(venue.address));
            this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
          });
        }

      });
    }

    deleteVenueOnConfirm(venueId: number) {
      this.alertify.confirm('Usuwanie obiektu', 'Chcesz usunąć ten obiekt?', () => this.deleteVenue(venueId));
    }

    deleteVenue(venueId: number) {
      this.adminService.deleteVenue(venueId).subscribe(next => {
        this.alertify.message('Miasto zostało usunięte.');
        this.loadVenues();
      }, error => {
        this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
      });
    }

}
