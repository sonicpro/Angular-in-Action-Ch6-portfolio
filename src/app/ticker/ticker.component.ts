import { Component, Input, OnInit, trigger, style, transition, animate } from '@angular/core';
import { IStock } from "../services/stocks.model"

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  animations: [
    trigger('slideOut', [
      transition(':leave', [
        style({
          marginLeft: 0,
          opacity: 1
        }),
        animate('1000ms ease-in-out', style({
          marginLeft: '-324px',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class TickerComponent implements OnInit {
  @Input() private stocks: IStock[] = [];
  private stocksF: IStock[] = [];
  interval: any;
  page: number = 0;

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.nextStock();
    }, 3000);
  }

  // On removing the first stock element adds a new ones if less then 30 left.
  ngOnChanges(): void {
    if (this.stocks.length && this.stocksF.length < 30) {
      if (this.page * 100 > this.stocks.length) {
        this.page = 0;
      }
      let additions = this.stocks.slice(this.page * 100, (this.page + 1) * 100);
      this.stocksF.push(...additions);
      this.page++;
    }
  }

  private nextStock(): void {
    this.stocksF.splice(0, 1);
  }
}
