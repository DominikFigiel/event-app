/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PromoterEventTicketsSettingsComponent } from './promoter-event-tickets-settings.component';

describe('PromoterEventTicketsSettingsComponent', () => {
  let component: PromoterEventTicketsSettingsComponent;
  let fixture: ComponentFixture<PromoterEventTicketsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoterEventTicketsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterEventTicketsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
