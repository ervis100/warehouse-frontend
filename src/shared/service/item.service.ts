import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Item} from "../model/Items";
import {environment} from "../../environment";

@Injectable({providedIn: "root"})
export class ItemService {
  constructor(private httpClient: HttpClient) {}

  getItems() {
    return this.httpClient.get<Item[]>(environment.apiUrl + "/api/inventory/items")
  }

}
