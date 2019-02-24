const itemStock = require("./itemStock");
const coinStock = require("./coinStock");
class VendingMachine {
  constructor() {
    this.itemStock = itemStock;
    this.coinStock = coinStock;
  }
  buy(itemCode, insertedMoney) {
    if (!this.itemStock[itemCode]) {
      return "Invalid item code";
    }
    if (!this.itemStock[itemCode].stock) {
      return "Out of stock";
    }
    if (this.itemStock[itemCode].price > insertedMoney) {
      return "Insufficient fund";
    }
    if (this.itemStock[itemCode].price === insertedMoney) {
      return `Dispending ${this.itemStock[itemCode].name}`;
    }
    if (this.itemStock[itemCode].price < insertedMoney) {
      let price = this.itemStock[itemCode].price;
      let change = Math.round(insertedMoney - price, 2);
      return `Dispending ${
        this.itemStock[itemCode].name
      } with $${change} back as change`;
    }
  }
}

module.exports = VendingMachine;
