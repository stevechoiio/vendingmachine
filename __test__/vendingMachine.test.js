const VendingMachine = require("../src/VendingMachine.js");

describe("Vending Machine", () => {
  const TheVendingMachine = new VendingMachine({});

  describe("Buying", () => {
    describe("can't buy because", () => {
      it("is invalid itemcode", () => {
        expect(TheVendingMachine.buy("A11", 5)).toEqual("Invalid item code");
      });
      it("is out of stock", () => {
        expect(TheVendingMachine.buy("A1", 5)).toEqual("Out of stock");
      });
      it("has insufficient fund", () => {
        expect(TheVendingMachine.buy("A2", 0.5)).toEqual("Insufficient fund");
      });
    });
    describe("can buy with", () => {
      it("should dispense with no change", () => {
        expect(TheVendingMachine.buy("A2", 2.45)).toEqual(
          "Dispending Diet Coca-Cola"
        );
      });
      it("should dispense with change", () => {
        expect(TheVendingMachine.buy("A2", 2.55)).toEqual(
          "Dispending Diet Coca-Cola with 1 Dime"
        );
      });
    });
  });
});
