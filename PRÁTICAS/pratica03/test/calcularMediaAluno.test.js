const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe("Testes da função calcularMediaAluno", () => {
//Calculadora existe?
    test("Calculadora existe?", () =>{
    expect(calcularMediaAluno).toBeDefined;
    })

//a1 ou a2 estão indefinidos?
    test("Deve lançar exceção se a1 não for informado", () => {
    expect(() => calcularMediaAluno(undefined, 5, 7)).toThrow("Notas a1 ou a2 não informadas");
    });

    test("Deve lançar exceção se a2 não for informado", () => {
    expect(() => calcularMediaAluno(5, undefined, 7)).toThrow("Notas a1 ou a2 não informadas");
    });


//a1 ou a2 são maiores que 0?
    test("Se o valor de a1 é positivo?", () => {
    expect(() => calcularMediaAluno(-3, 6, 7)).toThrow("Notas a1 ou a2 não podem ser negativas");
    });
    
    test("Se o valor de a2 é positivo?", () => {
    expect(() => calcularMediaAluno(6, -2, 7)).toThrow("Notas a1 ou a2 não podem ser negativas");
    });

//a3 é maior que 0?
    test("Deve lançar exceção se a3 for negativo", () => {
    expect(() => calcularMediaAluno(6, 5, -1)).toThrow("Nota a3 não pode ser negativa");
    });

    // === CÁLCULO BASE ===
    test("Deve calcular média base quando a3 não é informada", () => {
    expect(calcularMediaAluno(5, 7)).toBeCloseTo(6.2);
    });

  // === CÁLCULO COM SUBSTITUTIVA ===
    test("Deve usar melhor combinação substituindo a1 por a3", () => {
    // Base: 3*0.4 + 8*0.6 = 6
    // Substituindo a1 por a3: 7*0.4 + 8*0.6 = 7.6
    expect(calcularMediaAluno(3, 8, 7)).toBeCloseTo(7.6);
    });

    test("Deve usar melhor combinação substituindo a2 por a3", () => {
    // Base: 8*0.4 + 3*0.6 = 4.6
    // Substituindo a2 por a3: 8*0.4 + 7*0.6 = 7.4
    expect(calcularMediaAluno(8, 3, 7)).toBeCloseTo(7.4);
    });

});




// test("se P1 = 5 e P2 = 5, então (0.4 * 5) + (0.6 * 5) = 5", () => {
//     expect(calcularMediaAluno(5,5)).toBeDefined;
//     expect(calcularMediaAluno(5,5)).toBe(5);
// });