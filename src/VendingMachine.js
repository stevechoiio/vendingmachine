class VendingMachine {
  constructor(item, coin) {
    this.itemStock = item;
    this.coinStock = coin;
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

      let change = this.smallestChange(
        Math.ceil((insertedMoney - price) * 100) / 100
      );
      return this.checkCoinStock(insertedMoney - price, this.coinStock)
        ? "Insufficient change"
        : `Dispending ${
            this.itemStock[itemCode].name
          } with ${change} back as change`;
    }
  }
  restockCoin(coin, quantity) {
    if (!this.coinStock.hasOwnProperty(coin)) {
      return "Machine only accepts quarters, dimes and nickels";
    } else {
      this.coinStock[coin] += quantity;
      return `Restocked ${quantity} ${coin}`;
    }
  }
  restockItem(itemCode, quantity) {
    if (!this.itemStock[itemCode]) {
      return "Invalid itemcode";
    } else {
      this.itemStock[itemCode].stock += quantity;
      return `Restocked ${quantity} ${this.itemStock[itemCode].name}`;
    }
  }
  itemInventory() {
    let list = Object.keys(this.itemStock).reduce((acc, cur) => {
      let description = `${this.itemStock[cur].name} for $${
        this.itemStock[cur].price
      }, and there are  ${this.itemStock[cur].stock} in stock`;
      acc.push(description);
      return acc;
    }, []);
    return "Item Inventory: " + list.join(", ");
  }
  coinInventory() {
    let list = Object.keys(this.coinStock).reduce((acc, cur) => {
      let coins = `${this.coinStock[cur]} ${cur}`;
      acc.push(coins);
      return acc;
    }, []);
    return "Coin Inventory: " + list.join(", ");
  }
  smallestChange(change) {
    let remainder = change * 100;
    let result = [];
    if (Math.floor(remainder / 200)) {
      let toonies = Math.floor(remainder / 200);
      result.push(`${toonies} toonies`);

      remainder -= 200 * toonies;
    }
    if (Math.floor(remainder / 100)) {
      let loonies = Math.floor(remainder / 100);
      result.push(`${loonies} loonies`);
      remainder -= 100 * loonies;
    }
    if (Math.floor(remainder / 25)) {
      let quarters = Math.floor(remainder / 25);
      result.push(`${quarters} quarters`);

      remainder -= 25 * quarters;
    }
    if (Math.floor(remainder / 10) >= 1) {
      let dimes = Math.floor(remainder / 10);
      result.push(`${dimes} dimes`);
      remainder -= 10 * dimes;
    }
    if (Math.floor(remainder / 5) >= 1) {
      let nickels = Math.floor(remainder / 5);
      result.push(`${nickels} nickels`);
      remainder -= 5 * nickels;
    }
    return result.join(", ");
  }

  checkCoinStock(change, coinStock) {
    let remainder = change * 100;
    if (Math.floor(remainder / 25) <= coinStock["quarters"]) {
      let quarters = Math.floor(remainder / 25);
      remainder -= 25 * quarters;
    }
    if (Math.floor(remainder / 10) <= coinStock["dimes"]) {
      let dimes = Math.floor(remainder / 10);
      remainder -= 10 * dimes;
    }
    if (Math.floor(remainder / 5) <= coinStock["nickels"]) {
      let nickels = Math.floor(remainder / 5);
      remainder -= 5 * nickels;
    }
    return remainder > 5;
  }
}

module.exports = VendingMachine;
