export class GraphData {
  total_demand: number;

  committed_1m: number;
  committed_3m: number;
  committed_curr: number;
  committed_supply: number;

  confirmed_1m: number;
  confirmed_3m: number;
  confirmed_curr: number;
  confirmed_supply: number;

  constructor(
    total_demand: number,
    committed_1m: number,
    committed_3m: number,
    committed_curr: number,
    committed_supply: number,
    confirmed_1m: number,
    confirmed_3m: number,
    confirmed_curr: number,
    confirmed_supply: number
  ) {
    this.total_demand = total_demand;
    this.committed_1m = committed_1m;
    this.committed_3m = committed_3m;
    this.committed_curr = committed_curr;
    this.committed_supply = committed_supply;
    this.confirmed_1m = confirmed_1m;
    this.confirmed_3m = confirmed_3m;
    this.confirmed_curr = confirmed_curr;
    this.confirmed_supply = confirmed_supply;
  }
}
