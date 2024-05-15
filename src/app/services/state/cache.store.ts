import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {Injectable} from "@angular/core";

export interface CacheState extends EntityState<any, string> {
  favorites: any,
  page: string
}

const initialState = {
  favorites: [],
  page: 'home'
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'cache' })
export class CacheStore extends EntityStore<CacheState> {
  constructor() {
    super(initialState);
  }
}
