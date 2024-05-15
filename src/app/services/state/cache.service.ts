import {Injectable} from "@angular/core";
import {CacheStore} from "./cache.store";

@Injectable({ providedIn: "root" })
export class CacheService {

  constructor(private store: CacheStore) {}

  isFavorite(id: string) {
    const list = this.store.getValue().favorites;
    return list.find((el: any) => el == id);
  }

  add(id: string) {
    const list = this.store.getValue().favorites;
    this.store.update({favorites: [...list, id]});
  }

  delete(id: string) {
    const list = this.store.getValue().favorites.filter((el: any) => el !== id);
    this.store.update({favorites: [...list]});
  }

  setType(type: string) {
    this.store.update({page: type});
  }
}
