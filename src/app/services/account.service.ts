import { Injectable } from '@angular/core';
import { IStock } from "./stocks.model"

@Injectable()
export class AccountService {
  private static readonly defaultBalance: number = 1000;

  private balanceF: number = AccountService.defaultBalance;
  private costF: number = 0;
  private valueF: number = 0;
  private stocksF: IStock[] = [];

  // this.balanceF = how much money we have at the moment,
  // this.costF = how much we have spent for stock purchases.
  // this.valueF - the market value of the stocks we own.

  // Credit - we get some. Debit - we lose some.
  private debit(amount: number, affectedValue: number) : number {
    return (affectedValue * 100 - amount * 100) / 100;
  }

  private credit(amount: number, affectedValue: number) : number {
    return (affectedValue * 100 + amount * 100) / 100;
  }

  public get balance(): number { return this.balanceF; }
  public get cost(): number { return this.costF; }
  public get value(): number { return this.valueF; }
  public get stocks(): IStock[] { return this.stocksF; }

  public purchase(stock: IStock) : void {
    let stockCopy = Object.assign({}, stock);
    if (stockCopy.price < this.balance) {
        this.balanceF = this.debit(stockCopy.price, this.balanceF); // buy on market price.
        stockCopy.cost = stockCopy.price;
        this.costF = this.credit(stockCopy.price, this.costF);
        stockCopy.change = 0;
        this.stocksF.push(stockCopy)
        this.calculateValue();
    }
  }

  public sell(index: number) : void {
    let stock = this.stocksF[index];
    if (stock) {
        this.balanceF = this.credit(stock.price, this.balanceF); // Sell on market price. This does not work apparently, the price is the same as we had bought the stock.
        this.stocksF.splice(index, 1);
        this.costF = this.debit(stock.cost, this.costF); // Decrease the cost by the stock "historical" price.
        this.calculateValue();
    }
  }

  public reset() : void {
    this.stocksF = [];
    this.balanceF = AccountService.defaultBalance;
    this.valueF = this.costF = 0;
  }

  public calculateValue() : void {
    this.valueF = this.stocksF.map(s => s.price)
      .reduce(((prev, current) => prev + current), 0);
  }
}
