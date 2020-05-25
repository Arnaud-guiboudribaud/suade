import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SortedData } from 'src/app/shared/interface/sorted-data';
import { ReturnData } from 'src/app/shared/interface/return-data';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-graph',
  templateUrl: './dashboard-graph.component.html',
  styleUrls: ['./dashboard-graph.component.scss'],
})
export class DashboardGraphComponent implements OnInit, OnChanges {
  @Input() data: ReturnData;
  @Input() filter: string;
  @Output() emitSetFilter = new EventEmitter<string>();
  filterArray = [];
  chart;
  showSelect = false;
  chartType = 'column';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.filterArray = this.filter.split('-');
    this.setChart();
  }

  setChartFilterData(filter: string) {
    this.filter = filter;
    this.emitSetFilter.emit(filter);
    this.setChart();
  }
  setColumnChart(datas: SortedData[]) {
    return new Chart({
      chart: {
        styledMode: true,
      },
      title: {
        text: null,
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        categories: datas.map((d) => d.value),
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'number of people',
        },
      },

      plotOptions: {
        column: {
          borderRadius: 10,
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: 'column',
          dataLabels: [
            {
              enabled: true,
              inside: true,
              style: {
                fontSize: '24px',
                fontWeight: 'bold',
              },
              verticalAlign: 'bottom',
            },
          ],
          data: this.getColumnData(datas),
        },
      ],
    });
  }
  getColumnData(datas) {
    return datas.map((d) => {
      return {
        name: d.value,
        y: d.peoples.length,
        className: d.value,
      };
    });
  }
  setPieChart(datas) {
    return new Chart({
      chart: {
        styledMode: true,
      },
      title: {
        text: null,
      },
      legend: {
        enabled: true,
        labelFormat: '{name}: {value} - {percentage:.1f}%',
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
          showInLegend: true,
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: 'pie',
          colorByPoint: true,
          data: this.getPieData(datas),
        },
      ],
      exporting: {
        allowHTML: true,
      },
    });
  }
  getPieData(datas) {
    let total = 0;
    datas.map((dt) => (total += dt.peoples.length));
    return datas.map((d) => {
      return {
        name: d.value,
        y: total / d.peoples.length,
        value: d.peoples.length,
        className: d.value,
      };
    });
  }
  setChart(type?: string) {
    this.chartType = type ? type : this.chartType;
    const parentNode = this.filterArray[1] === 'fruit' || this.filterArray[1] === 'pet';
    const datas =
      this.filterArray.length > 1
        ? this.mixDatas(this.filterArray[0], this.filterArray[1], parentNode)
        : this.data[this.filterArray[0]];

    switch (this.chartType) {
      case 'pie':
        this.chart = this.setPieChart(datas);
        break;
      case 'column': {
        this.chart = this.setColumnChart(datas);
        break;
      }
    }
  }

  mixDatas(filter1: string, filter2: string, parentNode: boolean): SortedData[] {
    const alreadySet = [];
    const dataset = [];
    this.data[filter1].map((f) => {
      f.peoples.map((p) => {
        const toCheck = parentNode
          ? f.value + ' - ' + p.preferences[filter2]
          : f.value + ' - ' + p[filter2];

        const found = alreadySet.includes(toCheck);
        if (!found) {
          dataset.push({
            value: toCheck,
            peoples: [],
          });
          alreadySet.push(toCheck);
        }
        const toAdd = dataset.find((c) => c.value === toCheck);
        toAdd.peoples.push(p);
      });
    });
    return dataset;
  }
  showHideSelect() {
    this.showSelect = !this.showSelect;
  }
  showMap() {
    this.dashboardService.callMap$.next(this.data[this.filter[0]]);
  }
}
