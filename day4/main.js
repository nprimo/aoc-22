import fs from 'node:fs/promises'

const inputTest = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.split('\n')

const input = await fs.readFile('input', {encoding: 'utf8'})

const pairs = input.split('\n').map(row => row.split(','))

let count = 0

for (const pair of pairs) {
    if (pair.length != 2) break
    const [range1, range2]
        = pair.map(section => section.split('-'))
    if ((range1[0] <= range2[0] && range1[1] >= range2[1])
        || (range2[0] <= range1[0] && range2[1] >= range1[1])) {
        count++
        //console.log(pair)
    }
}

console.log(count)
