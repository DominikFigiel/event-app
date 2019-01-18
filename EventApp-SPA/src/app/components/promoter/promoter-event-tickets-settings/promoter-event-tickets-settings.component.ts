import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketCategory } from 'src/app/models/ticketCategory';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-promoter-event-tickets-settings',
  templateUrl: './promoter-event-tickets-settings.component.html',
  styleUrls: ['./promoter-event-tickets-settings.component.css']
})
export class PromoterEventTicketsSettingsComponent implements OnInit {
  eventId: number;
  ticketCategory: TicketCategory;
  ticketCategories: TicketCategory[];
  addForm: FormGroup;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private fb: FormBuilder,
    private adminService: AdminService, private eventService: EventService,
    private router: Router) { }

  ngOnInit() {
    this.setEventId();
    this.createAddForm();
    this.loadTicketCategories();
    this.checkIfEventIsFinished();
  }

  checkIfEventIsFinished() {
    this.eventService.getEvent(this.eventId).subscribe((event: Event) => {
      if (event.finished) {
        this.alertify.message('Wydarzenie zostało już zgłoszone do publikacji');
        this.router.navigate(['/promoter/management']);
      }
    }, error => {
      this.alertify.error(error);
    });
  }

  setEventAsFinished() {
    this.adminService.setEventAsFinished(this.eventId).subscribe(() => {
      this.alertify.success('Wydarzenie zostało zgłoszone do publikacji');
      this.router.navigate(['/promoter/management']);
    }, error => {
      this.alertify.error(error);
    });
  }

  setEventId() {
    if (this.route.snapshot.params['eventId']) {
      this.eventId = this.route.snapshot.params['eventId'];
    }
  }

  loadTicketCategories() {
    this.eventService.GetEventTicketCategories(this.eventId).subscribe((ticketCategories: TicketCategory[]) => {
      this.ticketCategories = ticketCategories;
    }, error => {
      this.alertify.error(error);
    });
  }

  createAddForm() {
    const regex = '^\$?(\d{1,3},?(\d{3},?)*\d{3}(\.\d{1,3})?|\d{1,3}(\.\d{2})?)$';
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      eventId: [this.eventId, [Validators.required]]
    });
  }

  addNewTicketCategory() {
    if (this.addForm.valid) {
      this.ticketCategory = Object.assign({}, this.addForm.value);
      this.adminService.addTicketCategory(this.ticketCategory).subscribe(() => {
        this.alertify.success('Kategoria biletów została zapisana w bazie.');
        this.addForm.reset();
        this.loadTicketCategories();
      }, error => {
        this.showErrorNotificationsFromRequest(error);
      });

    }
    // console.log(this.addForm.value);
  }

  showErrorNotificationsFromRequest(errorString) {
    const errors = errorString.split('\n');
    for (let i = 0; i < errors.length; i++) {
      if (errors[i] !== '') {
        if (errors[i].charAt(0) === ',') {
          this.alertify.error(errors[i].slice(1, errors[i].length));
        } else {
          this.alertify.error(errors[i]);
        }
      }
    }
  }
}
