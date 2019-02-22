const VendingMachine = require("../src/VendingMachine.js");

describe("Vending Machine", () => {
  let test = {};
  test.machine = new VendingMachine({});
  beforeEach(() => {
    test.machine.stock = {
      A1: 4,
      A4: 13
    };
  });
  describe("Buy a coke(A1)", () => {
    it("should be out of stock", () => {
      expect(test.machine.buy("A1", 5)).toEqual("Can't buy");
    });
    it("should be out of money", () => {
      expect(test.machine.buy("A1", 10)).toEqual("Can't buy");
    });
  });
});
