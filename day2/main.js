import fs from 'node:fs/promises'

const input = await fs.readFile('input', {encoding: 'utf8'})

const inputTest = `A Y
B X
C Z`

const roundList = input.trim().split('\n')

const strategy = {
    X: 'loose',
    Y: 'draw',
    Z: 'win'
}

const strategyPos = {
    loose: -1,
    draw: 0,
    win: 1
}

const plays = 'ABC'
// rock, paper, scissor
const getRoundScore = (result, play) => {
    const resultScore = {
        loose: 0,
        draw: 3,
        win: 6
    }
    return plays.search(play) + 1 + resultScore[result]
}

let score = 0
for (const round of roundList) {
    const result = strategy[round.at(2)]
    const player1pos = plays.search(round.at(0))
    const player2pos = player1pos + strategyPos[result]
    const player2 = plays.at(player2pos % 3)
    score += getRoundScore(result, player2)
}

console.log(score)
