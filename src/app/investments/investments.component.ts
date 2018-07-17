import { Component, DoCheck } from '@angular/core';
import { AccountService } from '../services/account.service';
import { IStock } from '../services/stocks.model';
// This component displays the list of hold stocks in "Your Portfolio" UI element.
// Does not take the data through input binding in the parent component.
// Instead syncs on the change detection through DoCheck lifecycle hook.
@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements DoCheck {
  cost: number = 0;
  value: number = 0;
  change: number = 0;
  stocks: IStock[] = [];
  length: number = 0;

  constructor(private accountService: AccountService) {}

  public sell(index: number): void {
    this.accountService.sell(index);
  }

  public ngDoCheck() : void {
    // Data service for this component is AccountService.
    // All the values in this component are in sync with the AccountService.
    if (this.stocks.length !== this.accountService.stocks.length) {
      this.stocks = this.accountService.stocks;
    }
    // "stocks" arrays might not change, but market price fluctuactions might lead to AccountService.value
    // is recomputed. This scenario is caused by AccountService.value recomputing by stocks-interceptor service.
    if (this.cost !== this.accountService.cost || this.value != this.accountService.value)
    {
      this.cost = this.accountService.cost;
      this.value = this.accountService.value;
      this.change = this.accountService.value - this.accountService.cost;
    }
  }
}
