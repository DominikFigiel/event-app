import { AdminService } from './../../../services/admin.service';
import { AlertifyService } from './../../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Subcategory } from 'src/app/models/subcategory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from 'src/app/models/event';
import { Venue } from 'src/app/models/venue';
import { BsDatepickerConfig, BsLocaleService, defineLocale, plLocale } from 'ngx-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
defineLocale('pl', plLocale);

@Component({
  selector: 'app-promoter-event-add',
  templateUrl: './promoter-event-add.component.html',
  styleUrls: ['./promoter-event-add.component.css']
})
export class PromoterEventAddComponent implements OnInit {
  subcategories: Subcategory[];
  subcategory: Subcategory;
  venues: Venue[];
  event: any;
  addForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  userId: number;

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private fb: FormBuilder, private adminService: AdminService,
    private bsLocale: BsLocaleService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.decodedToken.nameid;
    this.bsConfig = {
      containerClass: 'theme-default',
      minDate: this.getMinDate(),
      dateInputFormat: 'MMMM Do YYYY, HH:MM'
    };
    this.bsLocale.use('pl');
    this.loadSubcategories();
    this.loadVenues();
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.fb.group({
      subcategoryId: ['', [Validators.required]],
      venueId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      headline: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      date: ['', [Validators.required]],
      userId: [this.userId, [Validators.required]]
    });
  }

  getMinDate() {
    const minDate = new Date();
    const minMonth = minDate.getMonth() + 1;
    minDate.setMonth(minMonth);
    return minDate;
  }

  loadSubcategories() {
    this.eventService.getAllSubcategories().subscribe((subcategories: Subcategory[]) => {
      this.subcategories = subcategories;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadVenues() {
    this.eventService.getVenues().subscribe((venues: Venue[]) => {
      this.venues = venues;
    }, error => {
      this.alertify.error(error);
    });
  }

  addNewEvent() {
    if (this.addForm.valid) {
      this.event = Object.assign({}, this.addForm.value);
      this.adminService.addEvent(this.event).subscribe(() => {
        this.alertify.success('Wydarzenie zostało dodane.');
        // this.addForm.controls['name'].reset();
      }, error => {
        this.showErrorNotificationsFromRequest(error);
      });
    }
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
