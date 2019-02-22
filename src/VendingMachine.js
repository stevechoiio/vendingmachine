class VendingMachine {
  constructor(stock) {
    this.stock = stock;
    this.priceList = { A1: 12 };
  }
  buy(itemCode, dollarInserted) {
    if (!this.stock[itemCode] || dollarInserted < this.priceList[itemCode]) {
      return "Can't buy";
    }
  }
}

module.exports = VendingMachine;
