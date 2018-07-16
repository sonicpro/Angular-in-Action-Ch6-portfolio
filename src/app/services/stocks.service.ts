// Actually a wrapper over Angular HttpClient. Uses ConfigurationService's "api" property
// to get the data URL.
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { IStock } from "./stocks.model"

@Injectable()
export class StocksService {
    constructor(private http: HttpClient) { }
    
    // Returns an observable.
    getStocks() {
        return this.http.get<IStock[]>(ConfigService.get("api"));
    }
}
