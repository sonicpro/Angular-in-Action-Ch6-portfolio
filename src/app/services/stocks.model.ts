export interface IStock {
  symbol: string,
  name: string,
  price: number,
  change: number,
  cost: number // How much this stock cost at the moment we purchased it.
}