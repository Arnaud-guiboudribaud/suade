import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { DashboardGraphComponent } from './dashboard-graph.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartModule } from 'angular-highcharts';

describe('DashboardGraphComponent', () => {
  let component: DashboardGraphComponent;
  let fixture: ComponentFixture<DashboardGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, HttpClientTestingModule, ChartModule],
      declarations: [DashboardGraphComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGraphComponent);
    // component.data = null;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
