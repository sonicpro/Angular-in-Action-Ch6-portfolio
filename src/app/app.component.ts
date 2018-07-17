import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from "./services/account.service";
import { StocksService } from "./services/stocks.service";
import { IStock } from "./services/stocks.model";
import { AlertService } from "./services/alert.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Component-level provider as opposed to AppModule-level provider.
  providers: [
    StocksService
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private refresh: boolean = true;
  // Is bound to stocks.component and ticker.component. Must be public.
  public stocks: IStock[] = [];
  private timerId: any;

  constructor(private accountService: AccountService,
    private stocksService: StocksService,
    private alertService: AlertService) { }
    private static lastLoadedAt: number = 0;
    private static currentTime: number;

  ngOnInit(): void {
    this.accountService.init();
    this.load();
    this.timerId = setInterval(() => {
      if (this.refresh) { this.load(); }
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  toggleRefresh(): void {
    this.refresh = !this.refresh;
    let onOff = this.refresh ? "on" : "off";
    this.alertService.alert(`You have turned qutomatic refresh ${onOff}`, "info", 0);
  }

  reset(): void {
    this.accountService.reset();
    this.alertService.alert("You have reset the portfolio");
  }

  private load(): void {
    // AppComponent.currentTime = Date.now();
    // if (AppComponent.lastLoadedAt != 0) {
    //   console.log(AppComponent.currentTime - AppComponent.lastLoadedAt);
    // }
    // AppComponent.lastLoadedAt = AppComponent.currentTime;
    this.stocksService.getStocks().subscribe(stocks => this.stocks = stocks,
      error => console.error(`There was an error loading stocks: ${error}`));
  }
}
