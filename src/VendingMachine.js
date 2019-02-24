const smallestChange = (change, coinStock) => {
  let remainder = change * 100;
  let result = [];
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
};

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

      let change = smallestChange(
        Math.ceil((insertedMoney - price) * 100) / 100,
        this.coinStock
      );

      return `Dispending ${
        this.itemStock[itemCode].name
      } with ${change} back as change`;
    }
  }
  restockCoin(coin, quantity) {
    if (!this.coinStock.hasOwnProperty(coin)) {
      return "Machine only accepts quarters, dimes and nickels";
    } else {
      this.coinStock[coin] += quantity;
      return "Restocked!";
    }
  }
  restockItem(itemCode, quantity) {
    if (!this.itemStock[itemCode]) {
      return "Itemcode invalid";
    } else {
      this.itemStock[itemCode].stock += quantity;
      return "Added stock!";
    }
  }
  itemInventory() {
    return this.itemStock;
  }
  coinInventory() {
    return this.coinStock;
  }
}

module.exports = VendingMachine;
