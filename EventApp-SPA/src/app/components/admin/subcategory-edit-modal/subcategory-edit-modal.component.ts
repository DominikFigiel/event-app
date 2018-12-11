import { BsModalRef } from 'ngx-bootstrap';
import { Subcategory } from 'src/app/models/subcategory';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-subcategory-edit-modal',
  templateUrl: './subcategory-edit-modal.component.html',
  styleUrls: ['./subcategory-edit-modal.component.css']
})
export class SubcategoryEditModalComponent implements OnInit {
  @Output() updateSubcategory = new EventEmitter;
  subcategory: Subcategory;
  subcategoryName: any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.subcategoryName = this.subcategory.name;
  }

  update() {
    this.updateSubcategory.emit(this.subcategoryName);
    this.bsModalRef.hide();
  }

}
