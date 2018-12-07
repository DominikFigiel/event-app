import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BsModalRef } from 'ngx-bootstrap';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {
  @Output() updateCategory = new EventEmitter;
  category: Category;
  categoryName: any;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.categoryName = this.category.name;
  }

  update() {
    this.updateCategory.emit(this.categoryName);
    this.bsModalRef.hide();
  }

}
