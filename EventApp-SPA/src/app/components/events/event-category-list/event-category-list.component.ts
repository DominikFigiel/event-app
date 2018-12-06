import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { EventService } from 'src/app/services/event.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-event-category-list',
  templateUrl: './event-category-list.component.html',
  styleUrls: ['./event-category-list.component.css']
})
export class EventCategoryListComponent implements OnInit {
  categories: Category[];

  constructor(private eventService: EventService, private alertify: AlertifyService) { }


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

}
