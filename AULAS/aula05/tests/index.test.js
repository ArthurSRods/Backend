const calculadora = require("../src/index")

it("2 + 2 = 4", () => {
    expect(2 + 2).toBe(4);

});

test("5 + 5 = 10", () => {
    expect(5 + 5).toBe(10);

});

test("se a e b < 0 ou a e b > 0, então a * b > 0", () => {
    expect(calculadora.multiplicação(2,2)).toBeGreaterThan(0);
    expect(calculadora.multiplicação(3,2)).toBeGreaterThan(0);
});

test("se a < 0 ou b < 0, então a * b < 0", () => {
    expect(calculadora.multiplicação(2,-1)).toBeLessThan(0);
    expect(calculadora.multiplicação(-5,2)).toBeLessThan(0);
});

test("se a = 0 ou b = 0, então a * b = 0", () => {
    expect(calculadora.multiplicação(2,0)).toBe(0);
    expect(calculadora.multiplicação(0,94)).toBe(0);
    expect(calculadora.multiplicação(-2,0)).toBe(-0);
    expect(calculadora.multiplicação(0,5)).toBe(0);
});

test("se b = 0, então Divisão por ZERO", () => {
    expect(calculadora.divisao).toBeDefined();
    expect(() => calculadora.divisao(2,0)).toThrow("Divisão por ZERO");
});

