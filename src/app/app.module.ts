import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardTableComponent } from './dashboard/dashboard-table/dashboard-table.component';
import { DashboardGraphComponent } from './dashboard/dashboard-graph/dashboard-graph.component';
import { DashboardMapComponent } from './dashboard/dashboard-map/dashboard-map.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as highmaps from 'highcharts/modules/map.src';
import { DashboardEditComponent } from './dashboard/dashboard-edit/dashboard-edit.component';
import { DashboardFilterComponent } from './dashboard/dashboard-filter/dashboard-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardTableComponent,
    DashboardGraphComponent,
    DashboardMapComponent,
    DashboardEditComponent,
    DashboardFilterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [highmaps, more] }],
  bootstrap: [AppComponent],
})
export class AppModule {}
