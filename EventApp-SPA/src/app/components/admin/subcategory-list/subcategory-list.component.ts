import { Subcategory } from './../../../models/subcategory';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { Category } from 'src/app/models/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.css']
})
export class SubcategoryListComponent implements OnInit, OnChanges {
  @Input() reloadSubcategories: any;
  @Input() reloadCategories: any;
  categoryId: number;
  categories: Category[];
  subcategories: Subcategory[];
  bsModalRef: BsModalRef;

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private adminService: AdminService, private modalService: BsModalService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryId = 1;
    this.loadCategories();
    this.loadSubcategories();
    this.reloadSubcategories = false;
    this.reloadCategories = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadCategories();
    this.categoryId = 1;
    this.loadSubcategories();
  }

  onCategoryChange() {
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
