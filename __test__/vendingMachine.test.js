const VendingMachine = require("../src/VendingMachine.js");

describe("Vending Machine", () => {
  let test = {};
  test.machine = new VendingMachine({});

  describe("Buying", () => {
    beforeEach(() => {
      test.machine.stock = {
        A1: 0,
        A2: 2
      };
    });
    describe("can't buy because", () => {
      it("should be out of stock", () => {
        expect(test.machine.buy("A1", 5)).toEqual("Out of Stock");
      });
      it("should be wrong code", () => {
        expect(test.machine.buy("A11234", 5)).toEqual("Wrong Code");
      });
      it("should be insufficient fund", () => {
        expect(test.machine.buy("A2", 0.5)).toEqual("Insufficient fund");
      });
      it("should be out of stock", () => {
        expect(test.machine.buy("A1", 222)).toEqual("Out of Stock");
      });
    });
    describe("can buy with exact fund", () => {
      it("should be dispending", () => {
        expect(test.machine.buy("A2", 20)).toEqual("Dispending Pepsi");
      });
    });
    describe("can buy with change", () => {
      it("should be dispending with changes as quarters", () => {
        expect(test.machine.buy("A2", 20.5)).toEqual(
          "Dispending Pepsi, returning 2 quarters"
        );
      });
      it("should be dispending with changes as quarters", () => {
        expect(test.machine.buy("A2", 20.75)).toEqual(
          "Dispending Pepsi, returning 3 quarters"
        );
      });
      it("should be dispending with changes as quarters and dimes", () => {
        expect(test.machine.buy("A2", 20.85)).toEqual(
          "Dispending Pepsi, returning 3 quarters and one dime"
        );
      });
    });
  });
});
