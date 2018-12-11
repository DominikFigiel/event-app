import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-city-add-new',
  templateUrl: './city-add-new.component.html',
  styleUrls: ['./city-add-new.component.css']
})
export class CityAddNewComponent implements OnInit {
  city: City;
  addForm: FormGroup;

  constructor(private adminService: AdminService,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]]
    });
  }

  addNewCity() {
    if (this.addForm.valid) {
      this.city = Object.assign({}, this.addForm.value);
      this.adminService.addCity(this.city).subscribe(() => {
        this.alertify.success('Miasto zostało zapisane w bazie.');
        this.addForm.reset();
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
