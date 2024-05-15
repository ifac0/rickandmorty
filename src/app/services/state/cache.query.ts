import {QueryEntity} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {CacheStore} from "./cache.store";

@Injectable({
  providedIn: 'root'
})
export class CacheQuery extends QueryEntity<any> {

  constructor(protected override store: CacheStore) {
    super(store);
  }
}
