import fs from 'node:fs/promises'

const inputTest = `30373
25512
65332
33549
35390`

const input = await fs.readFile('input', { encoding: 'utf8' })

const getSize = input => {
  const nRows = input.trimEnd().split('\n').length
  const nCols = input.split('\n')[0].length
  return { nRows, nCols }
}

const { nRows, nCols } = getSize(input)
console.log(nRows, nCols)
const treeGrid = input
  .trimEnd()
  .split('\n')
  .map(row => row.split(''))

const isVisibleUp = ({ treeGrid, row, col }) => {
  const treeHeight = treeGrid[row][col]
  if (treeHeight === 9) return true
  let movingRow = row - 1
  for (; movingRow >= 0; movingRow--) {
    if (treeHeight <= treeGrid[movingRow][col]) break
  }
  if (movingRow < 0) return true
  return false
}

const isVisibleDown = ({ treeGrid, row, col }) => {
  const treeHeight = treeGrid[row][col]
  if (treeHeight === 9) return true
  let movingRow = row + 1
  for (; movingRow < nRows; movingRow++) {
    if (treeHeight <= treeGrid[movingRow][col]) break
  }
  if (movingRow === nRows) return true
  return false
}

const isVisibleLeft = ({ treeGrid, row, col }) => {
  const treeHeight = treeGrid[row][col]
  if (treeHeight === 9) return true
  let movinCol = col - 1
  for (; movinCol > 0; movinCol--) {
    if (treeHeight <= treeGrid[row][movinCol]) break
  }
  if (movinCol < 0) return true
  return false
}

const isVisibleRight = ({ treeGrid, row, col }) => {
  const treeHeight = treeGrid[row][col]
  if (treeHeight === 9) return true
  let movinCol = col + 1
  for (; movinCol < nCols; movinCol++) {
    if (treeHeight <= treeGrid[row][movinCol]) break
  }
  if (movinCol === nCols) return true
  return false
}

const isVisible = ({ treeGrid, row, col }) =>
  isVisibleUp({ treeGrid, row, col }) ||
  isVisibleDown({ treeGrid, row, col }) ||
  isVisibleLeft({ treeGrid, row, col }) ||
  isVisibleRight({ treeGrid, row, col })

let visibleInnerTrees = 0

for (let row = 1; row < nRows - 2; row++) {
  for (let col = 1; col < nCols - 2; col++) {
    if (isVisible({ treeGrid, row, col })) {
      visibleInnerTrees++
    }
  }
}
const visibleOuter = nRows * 2 + (nCols - 2) * 2
console.log(`inner: ${visibleInnerTrees}`)
console.log(`outer: ${visibleOuter}`)
console.log(visibleOuter + visibleInnerTrees)
