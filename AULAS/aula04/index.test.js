import { soma, subtracao, multiplicacao, divisao } from "./index.js";

console.log("Teste da função soma()");
console.log()
if(soma(4, 2) === 6) console.log("Passou 1º!");
else console.log("Falhou 1º!");
if(soma(-2, 2) === 0) console.log("Passou 2º!");
else console.log("Falhou 2º!");
if(soma(4, 4) === 8) console.log("Passou 3º!");
else console.log("Falhou 3º!");
if(soma(3, 5) === 8) console.log("Passou 4º!");
else console.log("Falhou 4º!");

console.log("Teste da função subtração()");
console.log()
if(subtracao(4, 2) === 2) console.log("Passou 5º!");
else console.log("Falhou 5º!");
if(subtracao(10, 5) === 5) console.log("Passou 6º!");
else console.log("Falhou 6º!");

console.log("Teste da função multiplicação()");
if(multiplicacao(4, 2) === 8) console.log("Passou 7º!");
else console.log("Falhou 7º!");
if(multiplicacao(-2, 2) === -4) console.log("Passou 8º!");
else console.log("Falhou 8º!");
if(multiplicacao(-2, 0) === 0) console.log("Passou 9º!");
else console.log("Falhou 9º!");
if(multiplicacao(-2, -2) === 4) console.log("Passou 10º!");
else console.log("Falhou 10º!");

console.log("Teste da função divisao()");
if (divisao(4, 2) === 2) console.log("Passou 11°!")
else console.log("Falhou 11º!")
if (divisao(2, 2) === 1) console.log("Passou 12°!")
else console.log("Falhou 12º!")
if (divisao(10, 5) === 2) console.log("Passou 13°!")
else console.log("Falhou 13º!")
if (divisao(-2, 2) === -1) console.log("Passou 14°!")
else console.log("Falhou 14º!")
