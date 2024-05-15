import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Items} from '../models/items.model';

const baseUrl = 'https://rickandmortyapi.com/api/character';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Items[]> {
    return this.http.get<{ results: Items[] }>(baseUrl)
      .pipe(
        map((response) => {
          return response?.results;
        })
      );
  }
}
