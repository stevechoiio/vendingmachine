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
    });
    describe("can buy with", () => {
      it("should dispense with no change", () => {
        expect(DefaultVendingMachine.buy("A2", 2.45)).toEqual(
          "Dispending Diet Coca-Cola"
        );
      });
      it("should dispense with one coin", () => {
        expect(DefaultVendingMachine.buy("A2", 2.55)).toEqual(
          "Dispending Diet Coca-Cola with 1 dimes back as change"
        );
      });
      it("should dispense with multiple coins", () => {
        expect(DefaultVendingMachine.buy("A2", 4.55)).toEqual(
          "Dispending Diet Coca-Cola with 8 quarters, 1 dimes back as change"
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
          "Restocked!"
        );
        expect(DefaultVendingMachine.coinStock.quarters).toEqual(151);
      });
    });
  });
  describe("Restocking items", () => {
    describe("can't restock item", () => {
      it("should be invalid item code", () => {
        expect(DefaultVendingMachine.restockItem("A1231", 32)).toEqual(
          "Itemcode invalid"
        );
      });
    });
    describe("can restock item", () => {
      it("should add stock", () => {
        expect(DefaultVendingMachine.restockItem("A1", 1)).toEqual(
          "Added stock!"
        );
        expect(DefaultVendingMachine.itemStock["A1"].stock).toEqual(1);
      });
    });
  });
  describe("Printing Inventory", () => {
    it("should print the item stock", () => {
      expect(DefaultVendingMachine.itemInventory()).toEqual(itemStock);
    });
    it("should print the coin stock", () => {
      expect(DefaultVendingMachine.coinInventory()).toEqual(coinStock);
    });
  });
});
