class VendingMachine {
  constructor(stock) {
    this.stock = stock;
    this.priceList = { A1: 5, A2: 20 };
    this.nameList = { A1: "Coke", A2: "Pepsi" };
  }
  buy(itemCode, dollarInserted) {
    if (this.stock[itemCode] === 0) {
      return "Out of Stock";
    }
    if (!this.stock[itemCode]) {
      return "Wrong Code";
    }
    if (this.priceList[itemCode] > dollarInserted) {
      console.log(dollarInserted);
      console.log(this.priceList[itemCode]);
      return "Insufficient fund";
    }
    if (this.priceList[itemCode] < dollarInserted) {
      const price = this.priceList[itemCode];
      const changeToBeReturned = dollarInserted - price;

      const calculateChange = change => {
        let result = [];
        let buffer = change;
        if (buffer / 0.25 > 1) {
          buffer = buffer - 0.25 * Math.floor(buffer / 0.25);
          console.log(buffer);
          result.append(`${quarters} quarters`);
        }
        if (dimes) {
          result.append(`${dimes} dimes`);
        }
        return result;
      };
      console.log(calculateChange(changeToBeReturned));
      const changes = `${numOf25} quarters`;

      return `Dispending ${this.nameList[itemCode]}, returning ${changes}`;
    }

    if ((this.priceList[itemCode] = dollarInserted)) {
      return `Dispending ${this.nameList[itemCode]}`;
    }
  }
}

module.exports = VendingMachine;
