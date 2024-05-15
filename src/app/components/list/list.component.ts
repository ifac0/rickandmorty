import {Component, OnDestroy, OnInit} from '@angular/core';
import {Items} from 'src/app/models/items.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  share,
  startWith,
  Subject,
  takeUntil,
  tap
} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {CacheService} from "../../services/state/cache.service";
import {CacheQuery} from "../../services/state/cache.query";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  results?: Items[];
  list?: Items[];
  filterPage = '';
  filterName = '';

  form = new FormGroup({
    search: new FormControl(),
  })

  private destroy$ = new Subject<void>();

  constructor(
    private tutorialService: TutorialService,
    private cacheService: CacheService,
    private cacheQuery: CacheQuery
  ) {
    this.cacheQuery.select()
      .pipe(
        share(),
        tap((el) => {
          this.filterPage = el?.page.toLowerCase();
          let isFavorite = false;
          if (this.filterPage == 'favorite') {
            isFavorite = true;
          }

          this.list = isFavorite ?
            this.results?.filter(item => {
              const name = String(item?.name).toLowerCase()
              return name.includes(this.filterName.toLowerCase()) && this.cacheService.isFavorite(item?.id)
            }) :
            this.results?.filter(item => {
              const name = String(item?.name).toLowerCase()
              return name.includes(this.filterName.toLowerCase())
            })
        }),
        catchError(err => {
          console.error(err);
          return of(err)
        })
      )
      .subscribe()
  }

  ngOnInit(): void {
    this.changeFilter();
    this.retrieveTutorials();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .pipe(
        share(),
        takeUntil(this.destroy$),
        tap((items: Items[]) => {
          this.results = items;
        }),
        catchError(err => {
          console.error(err)
          return of(err)
        })
      )
      .subscribe();
  }

  setFavorite(item: Items): void {
    if (this.isFavorite(item?.id)) {
      this.cacheService.delete(item.id);
    } else {
      this.cacheService.add(item.id);
    }
  }

  isFavorite(id: string) {
    return this.cacheService.isFavorite(id);
  }

  identify(index: number, item: any){
    return item.id;
  }

  private changeFilter() {
    this.form.get('search')?.valueChanges
      .pipe(
        startWith<string>(''),
        debounceTime(200),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap(value => {
          this.filterName = value;

          let isFavorite = false;
          if (this.filterPage == 'favorite') {
            isFavorite = true;
          }

          this.list = isFavorite ?
            this.results?.filter(item => {
              const name = String(item?.name).toLowerCase()
              return name.includes(this.filterName.toLowerCase()) && this.cacheService.isFavorite(item?.id)
            }) :
            this.results?.filter(item => {
              const name = String(item?.name).toLowerCase()
              return name.includes(this.filterName.toLowerCase())
            })
        })
      )
      .subscribe()
  }
}
