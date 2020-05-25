declare var require: any;

import { Component, OnInit, Input } from '@angular/core';
import { MapChart } from 'angular-highcharts';
import { ReturnData } from 'src/app/shared/interface/return-data';
import { DashboardService } from '../dashboard.service';
import * as Highcharts from 'highcharts';
import MapModule from 'highcharts/modules/map';
import proj4 from 'proj4';
import { SortedData } from 'src/app/shared/interface/sorted-data';
declare global {
  interface Window {
    proj4: any;
  }
}
window.proj4 = proj4;

const mapWorld = require('@highcharts/map-collection/custom/world.geo.json');
MapModule(Highcharts);

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss'],
})
export class DashboardMapComponent implements OnInit {
  @Input() data: SortedData[];
  mapChart;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.mapChart = this.setMap();
  }

  setMap() {
    return new MapChart({
      chart: {
        map: mapWorld,
      },

      mapNavigation: {
        enabled: true,
      },

      tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}',
      },

      series: this.getMapSeries(this.data),
    });
  }

  getMapSeries(datas: SortedData[]) {
    const series = [
      {
        type: 'map',
        name: 'Basemap',
        borderColor: '#A0A0A0',
        nullColor: 'rgba(200, 200, 200, 0.3)',
        showInLegend: false,
      } as any,
      {
        name: 'Separators',
        type: 'mapline',
        nullColor: '#707070',
        showInLegend: false,
        enableMouseTracking: false,
      } as any,
    ];
    datas.map((d) => {
      series.push({
        type: 'mappoint',
        name: d.value,
        data: d.peoples.map((p) => ({
          name: p.name,
          className: d.value,
          lat: p.location.latitude,
          lon: p.location.longitude,
        })),
      });
    });
    return series;
  }

  hideMap() {
    this.dashboardService.callMap$.next(false);
  }
}
