import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Venue } from 'src/app/models/venue';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AdminService } from 'src/app/services/admin.service';
import { VenueEditModalComponent } from '../venue-edit-modal/venue-edit-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit, OnChanges {
  @Input() reloadVenueList;
  venues: Venue[];
  bsModalRef: BsModalRef;

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
      const initialState = {
        venue
      };
      this.bsModalRef = this.modalService.show(VenueEditModalComponent, {initialState});
      this.bsModalRef.content.updateVenue.subscribe((venueName) => {
        const newVenueName = venueName;
        if (newVenueName && newVenueName !== '' && newVenueName !== venue.name) {
          venue.name = venueName;
          this.adminService.updateVenue(venue).subscribe(next => {
            this.alertify.success('Zmiany zostały zapisane.');
          }, error => {
            this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
          });
        }
      });
    }

    deleteVenueOnConfirm(venueId: number) {
      this.alertify.confirm('Usuwanie miasta', 'Chcesz usunąć ten obiekt?', () => this.deleteVenue(venueId));
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
