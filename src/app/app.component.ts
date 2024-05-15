import { Component } from '@angular/core';
import {CacheQuery} from "./services/state/cache.query";
import {catchError, map, Observable, of, share} from "rxjs";
import {CacheService} from "./services/state/cache.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  type = true;
  count$ = new Observable<number>;

  constructor(
    private cacheQuery: CacheQuery,
    private cacheService: CacheService
  ) {
    this.cacheService.setType('Home');

    this.count$ = this.cacheQuery.select()
      .pipe(
        share(),
        map((el) => {
          return el?.favorites?.length;
        }),
        catchError(err => {
          console.error(err);
          return of(err)
        })
      );
  }

  setType() {
    this.cacheService.setType(this.type == true ? 'Home': 'Favorite')
  }
}
