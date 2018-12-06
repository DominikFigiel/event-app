import { Category } from 'src/app/models/category';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-category-card',
  templateUrl: './event-category-card.component.html',
  styleUrls: ['./event-category-card.component.css']
})
export class EventCategoryCardComponent implements OnInit {
  @Input() category: Category;
  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
