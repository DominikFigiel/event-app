import { Component, OnInit } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categoryManagementActiveTab: string;


  constructor() { }

  ngOnInit() {
    this.categoryManagementActiveTab = 'category-list';
  }

  onSelectCatList(data: TabDirective): void {
    this.categoryManagementActiveTab = 'category-list';
  }

  onSelectAddNewCat(data: TabDirective): void {
    this.categoryManagementActiveTab = 'category-add-new';
  }

  onSelectSubcatList(data: TabDirective): void {
    this.categoryManagementActiveTab = 'subcategory-list';
  }

  onSelectAddNewSubcat(data: TabDirective): void {
    this.categoryManagementActiveTab = 'subcategory-add-new';
  }
}
