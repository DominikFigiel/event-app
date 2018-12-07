import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  bsModalRef: BsModalRef;

  constructor(private eventService: EventService, private alertify: AlertifyService,
    private adminService: AdminService, private modalService: BsModalService) { }


  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.eventService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    }, error => {
      this.alertify.error(error);
    });
  }

  editCategory(category: Category) {
    const initialState = {
      category
    };
    this.bsModalRef = this.modalService.show(CategoryEditModalComponent, {initialState});
    this.bsModalRef.content.updateCategory.subscribe((categoryName) => {
      const newCategoryName = categoryName;
      if (newCategoryName && newCategoryName !== '' && newCategoryName !== category.name) {
        category.name = categoryName;
        this.adminService.updateCategory(category.id, category).subscribe(next => {
          this.alertify.success('Zmiany zostały zapisane.');
        }, error => {
          this.alertify.error('Wystąpił błąd. Zmiany nie zostały zapisane.');
        });
      }
    });
  }

}
