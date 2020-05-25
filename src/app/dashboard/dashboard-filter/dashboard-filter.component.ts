import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss'],
})
export class DashboardFilterComponent implements OnInit {
  @Input() filterList: string[];
  @Input() filter = 'all';
  @Input() adaptColor = false;
  @Output() filtering = new EventEmitter<string>();
  showSelection = false;

  constructor() {}

  ngOnInit() {}

  showHideSelect() {
    this.showSelection = !this.showSelection;
  }

  setFilter(value: string) {
    this.filter = value;
    this.filtering.emit(value);
  }
}
