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


async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // Sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco ${block}`);
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