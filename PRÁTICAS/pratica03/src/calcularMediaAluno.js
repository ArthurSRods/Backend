function calcularMediaAluno(a1, a2, a3) {
    // Validação de undefined em a1 e a2
    if (a1 === undefined || a2 === undefined) {
      throw new Error("Notas a1 ou a2 não informadas");
    }
  
    // Validação de notas negativas em a1, a2
    if (a1 < 0 || a2 < 0) {
      throw new Error("Notas a1 ou a2 não podem ser negativas");
    }
  
    // Se a3 foi informada, validar negativo
    if (a3 !== undefined && a3 < 0) {
      throw new Error("Nota a3 não pode ser negativa");
    }
  
    // Caso base: a3 não informada → cálculo simples
    if (a3 === undefined) {
      return a1 * 0.4 + a2 * 0.6;
    }
  
    // Caso com a3 informada → substituir a menor entre a1 e a2
    // e calcular a melhor média possível
    const mediaBase = a1 * 0.4 + a2 * 0.6;
    const mediaComA1EA3 = a3 * 0.4 + a2 * 0.6; // substitui a1 por a3
    const mediaComA2EA3 = a1 * 0.4 + a3 * 0.6; // substitui a2 por a3
  
    // Melhor média entre as combinações
    return Math.max(mediaBase, mediaComA1EA3, mediaComA2EA3);
  }
  
module.exports = calcularMediaAluno;

module.exports = {calcularMediaAluno}

