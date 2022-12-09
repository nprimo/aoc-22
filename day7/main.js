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

const rows = inputTest.split('\n')

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

let pwd = ''
let tree = { tot: 0 }
for (const row of rows) {
  if (isDir(row)) {
    tree = updateTree(row, pwd, tree)
  } else if (isCommand(row)) {
    const [_, cmd, arg] = row.split(' ')
    if (cmd === 'cd') {
      pwd = cd(pwd, arg)
    }
  } else {
    let currPos = getCurrPos(pwd, tree)
    const [size, _] = row.split(' ')
    currPos.tot += parseInt(size)
  }
}

console.log(tree)

const getDirSize = (tree, size) => {
  Object.keys(tree).forEach(key => {
    if (typeof tree[key] === 'object') {
      size = getDirSize(tree[key], size)
    } else {
      size += tree.tot
    }
  })
  return size
}

const dirSize = {}
for (const key of Object.keys(tree)) {
  if (typeof tree[key] === 'obejct') {
    dirSize[key] = getDirSize(tree[key], 0)
  }
}

console.log(dirSize)
console.log(getDirSize(tree, 0))
