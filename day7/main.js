import fs from 'node:fs/promises'

const input = await fs.readFile('input', { encoding: 'utf8' })

const inputTest = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const rows = input.trimEnd().split('\n')

const isCommand = row => row.includes('$')
const isDir = row => row.includes('dir')

const cd = (pwd, newPath) => {
  switch (newPath) {
    case '..':
      const lastBackslah = pwd.lastIndexOf('/')
      pwd = pwd.slice(0, lastBackslah)
      if (pwd.length === 0) pwd = '/'
      break
    case '/':
      pwd = '/'
      break
    default:
      if (pwd.length > 1) pwd += `/${newPath}`
      else pwd += newPath
      break
  }
  return pwd
}

const getCurrPos = (pwd, tree) => {
  if (pwd.length === 1) return tree
  let currPos = tree
  const pathSteps = pwd.split('/').slice(1)
  for (const step of pathSteps) {
    currPos = currPos[step]
  }
  return currPos
}

const updateTree = (row, pwd, tree) => {
  let currPos = tree
  if (pwd.length > 1) {
    currPos = getCurrPos(pwd, tree)
  }
  const [_, dirName] = row.split(' ')
  currPos[dirName] = { tot: 0 }
  return tree
}

const getTotalSize = (tree, size) => {
  Object.keys(tree).forEach(key => {
    if (typeof tree[key] === 'object') {
      size = getTotalSize(tree[key], size)
    } else {
      size += tree.tot
    }
  })
  return size
}

let pwd = ''
let tree = { tot: 0 }
const dirSize = {}
for (const row of rows) {
  if (isDir(row)) {
    tree = updateTree(row, pwd, tree)
    dirSize[row.split(' ')[1]] = 0
  } else if (isCommand(row)) {
    const [_, cmd, arg] = row.split(' ')
    if (cmd === 'cd') {
      pwd = cd(pwd, arg)
    }
  } else {
    let currPos = getCurrPos(pwd, tree)
    const [size, _] = row.split(' ')
    const dirList = pwd.split('/')
    for (const dir of dirList)
      dir.length > 0 && (dirSize[dir] += parseInt(size))
    currPos.tot += parseInt(size)
  }
}

dirSize['/'] = getTotalSize(tree, 0)

const tot = Object.values(dirSize).reduce((sum, curr) => {
  if (curr <= 100000) {
    return sum + curr
  } else return sum
})

console.log(tot)
