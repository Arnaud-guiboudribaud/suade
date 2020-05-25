import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { DashboardMapComponent } from './dashboard-map.component';
import { ChartModule } from 'angular-highcharts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardMapComponent', () => {
  let component: DashboardMapComponent;
  let fixture: ComponentFixture<DashboardMapComponent>;

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
  const dataMocks = [{ value: 'brown', peoples: [onePeopleMocks] }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, HttpClientTestingModule, ChartModule],
      declarations: [DashboardMapComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMapComponent);
    component = fixture.componentInstance;
    component.data = dataMocks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
