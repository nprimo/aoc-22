import fs from 'node:fs/promises'

const inputTest = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

const input = await fs.readFile('input', { encoding: 'utf8' })

//const rows = inputTest.split('\n')
const rows = input.trim().split('\n')
const monkeyNumbers = {}

for (const row of rows) {
  const [monkey, value] = row.split(':')
  monkeyNumbers[monkey] = value.trim()
}

const isOperator = str => str && /[\+-\/\*]/.test(str)

const isNumber = str => str && /^[0-9]+$/.test(str)

const isAllDigits = root => {
  for (const val of root.split(' ')) {
    if (isOperator(val) || isNumber(val)) continue
    else return false
  }
  return true
}

const expandNumbers = numbers => {
  for (const val of numbers.split(' ')) {
    if (!isOperator(val) && !isNumber(val)) {
      if (isNumber(monkeyNumbers[val])) {
        numbers = numbers.replace(val, monkeyNumbers[val])
      }
    }
  }
  if (isAllDigits(numbers)) return eval(numbers)
  return numbers
}

while (typeof monkeyNumbers['root'] !== 'number') {
  for (const [monkey, numbers] of Object.entries(monkeyNumbers)) {
    if (typeof monkeyNumbers[monkey] !== 'number') {
      monkeyNumbers[monkey] = expandNumbers(numbers)
    }
  }
}

console.log(monkeyNumbers['root'])
console.log(monkeyNumbers['root'] === 24947355373338)
