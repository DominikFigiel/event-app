import { Subcategory } from './../../../models/subcategory';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { Category } from 'src/app/models/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubcategoryEditModalComponent } from '../subcategory-edit-modal/subcategory-edit-modal.component';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.css']
})
export class SubcategoryListComponent implements OnInit, OnChanges {
  @Input() categoryManagementActiveTab: any;
  categoryId: number;
  categories: Category[];
  subcategories: Subcategory[];
  bsModalRef: BsModalRef;

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private adminService: AdminService, private modalService: BsModalService,
    private fb: FormBuilder) { }

  ngOnInit() {
    // this.categoryId = 1;
    this.loadCategories();
    // this.loadSubcategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadCategories();
    // this.categoryId = 1;
    // this.loadSubcategories();
  }

  onCategoryChange($event) {
    this.loadSubcategories();
  }

  loadCategories() {
    this.eventService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadSubcategories() {
    this.eventService.getSubcategories(this.categoryId).subscribe((subcategories: Subcategory[]) => {
      this.subcategories = subcategories;
    }, error => {
      this.alertify.error(error);
    });
  }

  editSubcategory(subcategory: Subcategory) {
    const initialState = {
      subcategory
    };
    this.bsModalRef = this.modalService.show(SubcategoryEditModalComponent, {initialState});
    this.bsModalRef.content.updateSubcategory.subscribe((subcategoryName) => {
      const newSubcategoryName = subcategoryName;
      if (newSubcategoryName && newSubcategoryName !== '' && newSubcategoryName !== subcategory.name) {
        subcategory.name = subcategoryName;
        this.adminService.updateSubcategory(subcategory).subscribe(next => {
          this.alertify.success('Zmiany zostały zapisane.');
        }, error => {
          this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
        });
      }
    });
  }

  deleteSubcategoryOnConfirm(subcategoryId: number) {
    this.alertify.confirm('Usuwanie podkategorii', 'Chcesz usunąć tę podkategorię?', () => this.deleteSubcategory(subcategoryId));
  }

  deleteSubcategory(subcategoryId: number) {
    this.adminService.deleteSubcategory(subcategoryId).subscribe(next => {
      this.alertify.message('Podategoria została usunięta.');
      this.loadSubcategories();
    }, error => {
      this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
    });
  }

}
