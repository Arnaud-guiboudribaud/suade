import { Component, OnInit, Input } from '@angular/core';
import { People } from 'src/app/shared/interface/people';
import { DashboardService } from '../dashboard.service';
import { ReturnData } from 'src/app/shared/interface/return-data';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss'],
})
export class DashboardTableComponent implements OnInit {
  @Input() data: ReturnData;
  @Input() type: string;

  userToEdit: People = null;

  filter = {
    gender: 'all',
    pet: 'all',
    fruit: 'all',
    eyeColor: 'all',
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.editUser$.subscribe((data) => {
      this.userToEdit = data.user;
    });
  }

  editUser(user: People) {
    this.dashboardService.editUser$.next({ user, updatedUser: null });
  }
  filterTableBy(type: string, value: string) {
    this.filter[type] = value;
  }
}
