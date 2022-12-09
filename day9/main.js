import fs from 'node:fs/promises'

const inputTest = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const input = await fs.readFile('input', { encoding: 'utf8' })

let currHead = [0, 0]
let currTail = [0, 0]

const tailPositions = []
tailPositions.push(currTail.join())

const move = { U: [0, 1], R: [1, 0], D: [0, -1], L: [-1, 0] }

const isTailHeadNear = (head, tail) => {
  return Math.abs(head[0] - tail[0]) < 2 && Math.abs(head[1] - tail[1]) < 2
}

for (const row of input.trimEnd().split('\n')) {
  const [direction, steps] = row.split(' ')
  for (let i = steps; i > 0; i--) {
    const oldHead = [...currHead]
    currHead[0] += move[direction][0]
    currHead[1] += move[direction][1]
    if (!isTailHeadNear(currHead, currTail)) {
      currTail = oldHead
      if (!tailPositions.includes(currTail.join())) {
        tailPositions.push(currTail.join())
      }
    }
  }
}

console.log(tailPositions.length)
