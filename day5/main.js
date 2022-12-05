import fs from 'node:fs/promises'

const input = await fs.readFile('input', { encoding: 'utf8' })

const inputTest = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`
  .trimEnd()
  .split('\n')

const getNewBlocks = row => {
  const newBlocks = {}
  let currPos = 0
  while (row.search(/[A-Z]/g) > -1) {
    const relPos = row.search(/[A-Z]/g)
    newBlocks[(relPos + currPos - 1) / 4] = row[relPos]
    row = row.slice(relPos + 1)
    currPos += relPos + 1
  }
  return newBlocks
}

const updatePiles = (newBlocks, piles) => {
  for (const [key, value] of Object.entries(newBlocks)) {
    piles[key] ? (piles[key] = piles[key] + value) : (piles[key] = value)
  }
}

const parseInstruction = row => {
  const splitRow = row.split(' ')
  const quantity = parseInt(splitRow[1])
  const from = parseInt(splitRow[3])
  const to = parseInt(splitRow[5])
  return { quantity, from, to }
}

const execMove = ({ quantity, from, to, piles }) => {
  while (quantity > 0 && piles[from - 1].length > 0) {
    piles[to - 1] = piles[from - 1].slice(0, 1) + piles[to - 1]
    piles[from - 1] = piles[from - 1].slice(1)
    quantity--
  }
}

const execMove2 = ({ quantity, from, to, piles }) => {
  if (quantity > 0 && piles[from - 1].length > 0) {
    piles[to - 1] = piles[from - 1].slice(0, quantity) + piles[to - 1]
    piles[from - 1] = piles[from - 1].slice(quantity)
  }
}

const piles = {}
for (const row of input.trimEnd().split('\n')) {
  const isMove = row.search('move') > -1
  if (!isMove && row.search(/\[/g) > -1) {
    const newBlocks = getNewBlocks(row)
    updatePiles(newBlocks, piles)
  } else if (isMove) {
    const { quantity, from, to } = parseInstruction(row)
    //execMove({ quantity, form, to, piles }) // for part1
    execMove2({ quantity, from, to, piles })
  }
}

console.log(
  Object.values(piles)
    .map(v => v.at(0))
    .reduce((a, b) => a + b),
)
