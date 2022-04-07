import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveFilter, Filter } from './filters.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() group : string;
  @Input() filters : Filter[] = [];
  changeFilter;
  constructor() { }

  ngOnInit() {
    const initialFilter = this.filters.find(f => f.active);
    this.changeFilter = new BehaviorSubject<ActiveFilter>({
      group: this.group,
      id: initialFilter.id
    });
  }
  ngOnDestroy() {
    this.changeFilter.unsubscribe();
  }
  select( filter : Filter ) {
    this.filters.forEach(filter => filter.active = false);
    filter.active = true;
    this.changeFilter.next({
      group: this.group,
      id: filter.id
    });
  }

}