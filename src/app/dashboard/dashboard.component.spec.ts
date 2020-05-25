import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const onePeopleMocks = {
    _id: '5d5d7ad6b0e83bc2d9d67dfb',
    age: 28,
    eyeColor: 'brown',
    name: 'Stephens Townsend',
    gender: 'male',
    location: {
      latitude: 26.723281,
      longitude: 99.391104,
    },
    preferences: {
      pet: 'bird',
      fruit: 'apple',
    },
  };
  const dataMocks = {
    origin: [onePeopleMocks],
    eyeColor: [{ value: 'brown', peoples: [onePeopleMocks] }],
    pet: [{ value: 'bird', peoples: [onePeopleMocks] }],
    fruit: [{ value: 'apple', peoples: [onePeopleMocks] }],
    gender: [{ value: 'male', peoples: [onePeopleMocks] }],
    filters: {
      eyeColor: ['all', 'brown', 'blue', 'green'],
      fruit: ['all', 'apple', 'strawberry', 'banana', 'mango'],
      gender: ['all', 'male', 'female'],
      pet: ['all', 'bird', 'cat', 'none', 'dog'],
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, HttpClientTestingModule],
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.datas = dataMocks;
    expect(component).toBeTruthy();
  });
});
