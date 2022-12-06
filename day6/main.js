import fs from 'node:fs/promises'

const inputTest = [
  'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
  'bvwbjplbgvbhsrlpgdmjqwftvncz',
  'nppdvjthqldpwncqszvftbrmjlhg',
  'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
  'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
]

const searchMarker = str => {
  let markerPos = 4
  while (
    markerPos < str.length - 1 &&
    new Set(str.slice(markerPos - 4, markerPos)).size != 4
  ) {
    markerPos++
  }
  return markerPos++
}

const searchMessage = str => {
  let markerPos = 14
  while (
    markerPos < str.length - 1 &&
    new Set(str.slice(markerPos - 14, markerPos)).size != 14
  ) {
    markerPos++
  }
  return markerPos++
}

console.log('test input:')
for (const input of inputTest) {
  console.log(searchMessage(input))
}

const input = await fs.readFile('input', { encoding: 'utf8' })
console.log(`part1 result: ${searchMarker(input)}`)
console.log(`part2 result: ${searchMessage(input)}`)
