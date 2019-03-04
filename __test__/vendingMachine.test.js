const VendingMachine = require("../src/VendingMachine.js");
const itemStock = require("../src/itemStock");
const coinStock = require("../src/coinStock");

describe("Vending Machine", () => {
  const DefaultVendingMachine = new VendingMachine(itemStock, coinStock);

  describe("Buying", () => {
    describe("can't buy because", () => {
      it("is invalid itemcode", () => {
        expect(DefaultVendingMachine.buy("A11", 5)).toEqual(
          "Invalid item code"
        );
      });
      it("is out of stock", () => {
        expect(DefaultVendingMachine.buy("A1", 5)).toEqual("Out of stock");
      });
      it("has insufficient fund", () => {
        expect(DefaultVendingMachine.buy("A2", 0.5)).toEqual(
          "Insufficient fund"
        );
      });
      it("machine doesn't have enough coin stock for change", () => {
        expect(DefaultVendingMachine.buy("C1", 12320)).toEqual(
          "Insufficient change"
        );
      });
    });
    describe("can buy with", () => {
      it("should dispense with no change", () => {
        expect(DefaultVendingMachine.buy("A2", 2.45)).toEqual(
          "Dispending Fat Coca-Cola"
        );
      });
      it("should dispense with one coin", () => {
        expect(DefaultVendingMachine.buy("A2", 2.55)).toEqual(
          "Dispending Fat Coca-Cola with 1 dimes back as change"
        );
      });
      it("should dispense with multiple coins", () => {
        expect(DefaultVendingMachine.buy("A2", 4.55)).toEqual(
          "Dispending Fat Coca-Cola with 1 toonies, 1 dimes back as change"
        );
      });
    });
  });
  describe("Restocking coin", () => {
    describe("can't restock, and shouldn't change the quantity because", () => {
      it("should be invalid input", () => {
        expect(DefaultVendingMachine.restockCoin("Loonies", 321)).toEqual(
          "Machine only accepts quarters, dimes and nickels"
        );
        expect(DefaultVendingMachine.coinStock.quarters).toEqual(30);
      });
      it("should be able to restock and change the quantity", () => {
        expect(DefaultVendingMachine.restockCoin("quarters", 121)).toEqual(
          "Restocked 121 quarters"
        );
        expect(DefaultVendingMachine.coinStock.quarters).toEqual(151);
      });
    });
  });
  describe("Restocking items", () => {
    describe("can't restock item", () => {
      it("should be invalid item code", () => {
        expect(DefaultVendingMachine.restockItem("A1231", 32)).toEqual(
          "Invalid itemcode"
        );
      });
    });
    describe("can restock item", () => {
      it("should add stock", () => {
        expect(DefaultVendingMachine.restockItem("A1", 1)).toEqual(
          "Restocked 1 Cola-Coca"
        );
        expect(DefaultVendingMachine.itemStock["A1"].stock).toEqual(1);
      });
    });
  });
  describe("Printing Inventory", () => {
    it("should print the item stock", () => {
      expect(DefaultVendingMachine.itemInventory()).toEqual(
        "Item Inventory: Cola-Coca for $2.75, and there are  1 in stock, Fat Coca-Cola for $2.45, and there are  32 in stock, Pepsid for $1.3232123123123122e+28, and there are  0 in stock, Suprite for $2.45, and there are  1 in stock, Water for $1.5, and there are  32 in stock, Dr.Qepper for $2, and there are  1 in stock, America Dry for $123.45, and there are  999 in stock, Iced Tee for $4.45, and there are  5 in stock, Parking Water for $2.05, and there are  3 in stock, Lemonaid for $1.45, and there are  0 in stock"
      );
    });
    it("should print the coin stock", () => {
      expect(DefaultVendingMachine.coinInventory()).toEqual(
        "Coin Inventory: 10 toonies, 23 loonies, 151 quarters, 10 dimes, 12 nickels"
      );
    });
  });
});
