import { Component, Input } from '@angular/core';
import { AccountService } from '../services/account.service';
import { IStock } from "../services/stocks.model"
// This component displays the list of available stocks in "All Stocks" UI element.
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {
  @Input() stocks: IStock[];

  constructor(private accountService: AccountService) {}

  public buy(stock: IStock): void {
    this.accountService.purchase(stock);
  }

}
