/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventCategoryCardComponent } from './event-category-card.component';

describe('EventCategoryCardComponent', () => {
  let component: EventCategoryCardComponent;
  let fixture: ComponentFixture<EventCategoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCategoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
