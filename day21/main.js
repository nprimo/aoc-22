import exp from 'node:constants'
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

const rows = inputTest.split('\n')
const monkeyNumbers = {}

for (const row of rows) {
  const [monkey, value] = row.split(':')
  monkeyNumbers[monkey] = value.trim()
}

const isOperator = str => str && /[\+-\/\*]/.test(str)
//str.includes('+') ||
//str.includes('-') ||
//str.includes('/') ||
//str.includes('*')

const isNumber = str => str && /^[0-9]+$/.test(str)

const isAllDigits = root => {
  for (const val of root.split(' ')) {
    if (isOperator(val) || isNumber(val)) continue
    else return false
  }
  return true
}

let root = monkeyNumbers['root']

const expandRoot = root => {
  for (const val of root.split(' ')) {
    if (!isOperator(val) && !isNumber(val)) {
      root = root.replace(val, monkeyNumbers[val])
    }
  }
  return root
}

while (!isAllDigits(root)) {
  root = expandRoot(root)
}

console.log(root)
