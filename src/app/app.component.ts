import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from "./services/account.service";
import { StocksService } from "./services/stocks.service";
import { IStock } from "./services/stocks.model";

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
    private stocksService: StocksService) { }

  ngOnInit(): void {
    this.load();
    this.timerId = setInterval(() => {
      if (this.refresh) { this.load(); }
    }, 1500);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  toggleRefresh(): void {
    this.refresh = !this.refresh;
  }

  reset(): void {
    this.accountService.reset();
  }

  private load(): void {
    this.stocksService.getStocks().subscribe(stocks => this.stocks = stocks,
      error => console.error(`There was an error loading stocks: ${error}`));
  }
}
