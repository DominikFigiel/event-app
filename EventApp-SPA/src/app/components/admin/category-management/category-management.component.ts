import { Component, OnInit } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  reloadCategories: boolean;

  constructor() { }

  ngOnInit() {
    this.reloadCategories = false;
  }

  onSelectCatList(data: TabDirective): void {
    this.reloadCategories = true;
  }

  onSelectAddNewCat(data: TabDirective): void {
    this.reloadCategories = false;
  }
}
