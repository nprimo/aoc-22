import fs from 'node:fs/promises'

const inputTest = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

const input = await fs.readFile('input', {encoding: 'utf8'})

const pairs = input.split('\n').map(row => row.split(','))

const isFullyIncluded = (range1, range2) => {
    return (parseInt(range1[0]) <= parseInt(range2[0]) && parseInt(range1[1]) >= parseInt(range2[1]))
        || (parseInt(range2[0]) <= parseInt(range1[0]) && parseInt(range2[1]) >= parseInt(range1[1]))
}

const isOverlapping = (range1, range2) => {
    return parseInt(range1[1]) >= parseInt(range2[0])
        && parseInt(range2[1]) >= parseInt(range1[0])
}

let countIncluded = 0
let countOverlap = 0
for (const pair of pairs) {
    if (pair.length != 2) break
    const [range1, range2]
        = pair.map(section => section.split('-'))
    if (isFullyIncluded(range1, range2)) countIncluded++
    if (isOverlapping(range1, range2)) {
        countOverlap++
        console.log(pair)
    }
}

console.log(`Fully included ranges: ${countIncluded}`)
console.log(`Overlapping ranges: ${countOverlap}`)
