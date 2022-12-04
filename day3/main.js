import fs from 'node:fs/promises'

const inputTest = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`.split('\n')

const input = await fs.readFile('input', {encoding: 'utf8'})

const getCommonItem = (str) => {
    const firstPart = str.slice(0, str.length / 2)
    const secondPart = str.slice(-(str.length / 2))

    for (const letter of firstPart) {
        if (secondPart.search(letter) > -1)
            return letter
    }
}

const getItemValue = (letter) => {
    const alphaLow = 'abcdefghijklmnopqrstuvwxyz'
    const alphaUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (letter === undefined)
        return 0
    if (alphaLow.search(letter) > -1)
        return alphaLow.search(letter) + 1
    else if (alphaUp.search(letter) > -1)
        return alphaUp.search(letter) + 27
}

const score = input.split('\n')
    .map(row => {
        return getCommonItem(row)
    })
    .map(item => {
        return getItemValue(item)
    })
    .reduce((a, b) => a + b)

console.log(score)
