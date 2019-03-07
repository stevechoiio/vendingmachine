const VendingMachine = require("../src/VendingMachine.js");
const itemStock = require("../src/itemStock");
const coinStock = require("../src/coinStock");

describe("Vending Machine", () => {
  const DefaultVendingMachine = new VendingMachine(itemStock, coinStock);

  describe("Buying product", () => {
    describe("invalid purchase", () => {
      it("should give a error message when user inputs invalid itemcode", () => {
        expect(DefaultVendingMachine.buy("A11", 5)).toEqual(
          "Invalid item code"
        );
      });
      it("should say it is out of stock when there is no stock", () => {
        expect(DefaultVendingMachine.buy("A1", 5)).toEqual("Out of stock");
      });
      it("should not dispend anything when user puts in insufficient fund and return error message", () => {
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
    describe("valid", () => {
      it("should dispense with no change when user provides exact change", () => {
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
      it("should be return an error message when restocking invalid item ", () => {
        expect(DefaultVendingMachine.restockCoin("TOOOOnies", 321)).toEqual(
          "Machine only accepts toonies, loonies, quarters, dimes and nickels"
        );
      });
      it("should be not change the value when restocking invalid item", () => {
        expect(DefaultVendingMachine.coinStock.quarters).toEqual(30);
      });
      it("should be able to restock and change the quantity and return a success message", () => {
        expect(DefaultVendingMachine.restockCoin("quarters", 121)).toEqual(
          "Restocked 121 quarters"
        );
      });
      it("should be able to restock and change the quantity and change the stock", () => {
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
    describe("restock item", () => {
      it("should add stock and return message", () => {
        expect(DefaultVendingMachine.restockItem("A1", 1)).toEqual(
          "Restocked 1 Cola-Coca"
        );
      });
      it("should add stock and change the itemstock value", () => {
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
