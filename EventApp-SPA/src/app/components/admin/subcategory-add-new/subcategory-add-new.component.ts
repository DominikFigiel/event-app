import { Component, OnInit } from '@angular/core';
import { Subcategory } from 'src/app/models/subcategory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Category } from 'src/app/models/category';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-subcategory-add-new',
  templateUrl: './subcategory-add-new.component.html',
  styleUrls: ['./subcategory-add-new.component.css']
})
export class SubcategoryAddNewComponent implements OnInit {
  categories: Category[];
  subcategory: Subcategory;
  addForm: FormGroup;
  constructor(private adminService: AdminService, private eventService: EventService,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createAddForm();
    this.loadCategories();
    this.addForm.controls['categoryId'].setValue(1, {onlySelf: true});
  }

  createAddForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      categoryId: ['', [Validators.required]]
    });
  }

  loadCategories() {
    this.eventService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    }, error => {
      this.alertify.error(error);
    });
  }

  addNewSubcategory() {
    if (this.addForm.valid) {
      this.subcategory = Object.assign({}, this.addForm.value);
      this.adminService.addSubcategory(this.subcategory).subscribe(() => {
        this.alertify.success('Podkategoria została zapisana w bazie.');
        this.addForm.reset();
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
