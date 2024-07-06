// Criando objeto que representa um player

const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "LUIGI",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}

// Simulando o lançamento de um dado
// Math.random() Retorna um numero entre 0 e 1
// Multiplicando por 6 faz com que retorne um numero entre 0 e 6
// Math.floor() arredonda um numero para baixo (Inteiro) Entao o resultado seria entre 0 e 5
// Adicionando o 1, o resultado seria entre 1 e 6 (Inteiro)
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function logRollResult(playerName, block, diceResult, attribute) {
    console.log(`${playerName} 🎲 Rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // Sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco ${block}`);

        // Rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Teste da habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(player1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(player2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        } else if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(player1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(player2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        } else if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou ${character2.NOME}! 🥊`);

            await logRollResult(player1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(player2.NOME, "poder", diceResult2, character2.PODER);

            // Comparando poder
            character2.PONTOS -= (powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0);
            character1.PONTOS -= (powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0);

            if (powerResult1 === powerResult2) console.log("Confronto empatado! Nenhum ponto foi perdido");
        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto`);
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto`);
            character2.PONTOS++;
        }

        console.log('------------------------------------');
    }
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }

    return result;
}

// Função de entrada responsável por chamar todas as outras funções
// Função auto-invocada 
(async function main() {
    console.log(
        `Corrinda entre ${player1.NOME} e ${player2.NOME} começando... \n`
    )

    await playRaceEngine(player1, player2);
})();