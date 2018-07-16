import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import { HttpEvent, HttpInterceptor, HttpResponse, HttpHandler, HttpRequest } from "@angular/common/http";

import { AccountService } from "./account.service";
import { IStock } from "./stocks.model";
import { ConfigService } from "./config.service";

@Injectable()
export class StocksInterceptorService implements HttpInterceptor{

  constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    const request = req.clone();
    request.headers.append("Accept", "application/json");
    return next.handle(request).do(event =>
      {
        if (event instanceof HttpResponse && event.url === ConfigService.get("api")) {
          const stocks = event.body as IStock[];
          let symbols = this.accountService.stocks.map(s => s.symbol);
          // Now update the account service with the recent prices to reflect it on "My Profile".
          stocks.forEach(s => this.accountService.stocks.map(item =>
            {
              if (s.symbol === item.symbol) {
                item.price = s.price;
                item.change = (s.price * 100 - item.cost * 100) / 100;
              }
            })
          );
          // Calculate "value" of the stocks we hold using the current merket price.
          this.accountService.calculateValue();
          // Pass the original value got from the remote API to the actual consumer, which is AppComponent
          // with two underlying components, namely ticks.component and stocks.component.
          return stocks;
        }
      });
  }

}
