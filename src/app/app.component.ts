import {
  AfterViewInit,
  Component,
  QueryList,
  VERSION,
  ViewChildren,
} from '@angular/core';
import { combineLatest, timer } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { FiltersComponent } from './filters/filters.component';
import { ActiveFilter, Filter } from './filters/filters.interface';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  name = 'Angular ' + VERSION.major;
  resourceType: Filter[] = [
    {
      id: 'all',
      title: 'All',
      active: true,
    },
    {
      id: 'article',
      title: 'Article',
    },
    {
      id: 'video',
      title: 'Video',
    },
    {
      id: 'course',
      title: 'Course',
    },
  ];

  levels: Filter[] = [
    {
      id: 'beginner',
      title: 'Beginner',
      active: true,
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
    },
    {
      id: 'advanced',
      title: 'Advanced',
    },
  ];
  @ViewChildren(FiltersComponent) filters: QueryList<FiltersComponent>;
  resources;
  ngAfterViewInit() {
    const filters = this.filters.map((f) => f.changeFilter);

    this.resources = combineLatest(...filters).pipe(
      map((filters: ActiveFilter[]) =>
        filters.map((filter) => `${filter.group}=${filter.id}`).join('&')
      ),
      switchMap(this.getData)
    );
    this.resources.subscribe(res => {
      console.log(res);
    })
  }

  getData(query) {
    // Simulate HTTP request..
    return timer(1000).pipe(mapTo('https://api.com?' + query));
  }
}
