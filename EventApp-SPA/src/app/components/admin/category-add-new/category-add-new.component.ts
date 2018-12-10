import { AdminService } from './../../../services/admin.service';
import { Category } from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-category-add-new',
  templateUrl: './category-add-new.component.html',
  styleUrls: ['./category-add-new.component.css']
})
export class CategoryAddNewComponent implements OnInit {
  category: Category;
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

  addNewCategory() {
    if (this.addForm.valid) {
      this.category = Object.assign({}, this.addForm.value);
      this.adminService.addCategory(this.category).subscribe(() => {
        this.alertify.success('Kategoria została zapisana w bazie.');
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
