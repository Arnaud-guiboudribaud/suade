import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ReturnData } from '../shared/interface/return-data';
import { SortedData } from '../shared/interface/sorted-data';
import { People } from '../shared/interface/people';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  datas: ReturnData;
  showMap = false;
  editUser = false;
  mapData: SortedData;
  userData: People = null;
  mergeGraph = false;

  filters = ['fruit', 'pet'];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getPeoples('./assets/mocks/people.json').subscribe((ret) => {
      this.datas = ret;
    });
    this.dashboardService.callMap$.subscribe((call) => {
      console.log(call);
      this.showMap = !!call;
      this.mapData = call;
    });
    this.dashboardService.editUser$.subscribe((data) => {
      this.editUser = !!data.user;
      this.userData = data.user;
      if (!!data.updatedUser) {
        this.datas = this.dashboardService.updateUser(data.updatedUser);
      }
    });
  }

  setFilter(value: string, index: number) {
    const filters = this.filters;
    // this.filters = new Array(value, 'pet');
    this.filters[index] = value;
    console.log('dashboard', this.filters);
  }

  mergeChartsData() {
    this.mergeGraph = !this.mergeGraph;
  }
}
