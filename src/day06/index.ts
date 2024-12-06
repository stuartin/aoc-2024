import run from "aocrunner";
import fs from "node:fs"

const direction = ['u', 'r', 'd', 'l'] as const
type Direction = typeof direction[number]

const parseInput = (rawInput: string) => {
  let startPos: number[] = []
  let blockers: number[][] = []

  const map = rawInput.split("\n").map((row, y) => {
    return row.trim().split('').map((col, x) => {
      if (col === "^") {
        startPos = [x, y]
        return "X"
      }

      if (col === "#") {
        blockers.push([x, y])
      }

      return col
    })
  })

  return { map, blockers, startPos }
};

function move(map: string[][], blockers: number[][], dir: Direction, startPos: number[]): { map: string[][], startPos: number[], isDone: boolean } {
  let newMap = [...map]
  let newStartPos: number[] = []
  let isDone = false

  console.log({ startPos })

  switch (dir) {
    case 'u': {
      const blockersInDir = blockers.filter(block => block[0] === startPos[0] && block[1] < startPos[1]).sort((a, b) => b[1] - a[1])
      const blockPos = blockersInDir[0]
      if (!blockPos) {
        isDone = true

        newMap = newMap.map((row, y) => {
          return row.map((col, x) => {
            if (startPos[0] === x && startPos[1] > y) {
              return "X"
            }

            return col
          })
        })

        break
      }

      newStartPos = [blockPos[0], blockPos[1] + 1]
      console.log({ dir, blockersInDir, blockPos, newStartPos })

      newMap = newMap.map((row, y) => {
        return row.map((col, x) => {
          if (blockPos[0] === x && blockPos[1] === y) {
            return col
          }

          if (startPos[0] === x && startPos[1] > y && y > blockPos[1]) {
            return "X"
          }

          return col
        })
      })
      break;
    }
    case 'r': {
      const blockersInDir = blockers.filter(block => block[0] > startPos[0] && block[1] === startPos[1]).sort((a, b) => a[0] - b[0])
      const blockPos = blockersInDir[0]
      if (!blockPos) {
        isDone = true

        newMap = newMap.map((row, y) => {
          return row.map((col, x) => {
            if (startPos[0] < x && startPos[1] === y) {
              return "X"
            }

            return col
          })
        })

        break
      }

      newStartPos = [blockPos[0] - 1, blockPos[1]]
      console.log({ dir, blockersInDir, blockPos, newStartPos })

      newMap = newMap.map((row, y) => {
        return row.map((col, x) => {
          if (blockPos[0] === x && blockPos[1] === y) {
            return col
          }

          if (startPos[0] < x && startPos[1] === y && x < blockPos[0]) {
            return "X"
          }

          return col
        })
      })
      break;
    }
    case 'd': {
      const blockersInDir = blockers.filter(block => block[0] === startPos[0] && block[1] > startPos[1]).sort((a, b) => a[1] - b[1])
      const blockPos = blockersInDir[0]
      if (!blockPos) {
        isDone = true

        newMap = newMap.map((row, y) => {
          return row.map((col, x) => {
            if (startPos[0] === x && startPos[1] < y) {
              return "X"
            }

            return col
          })
        })

        break
      }

      newStartPos = [blockPos[0], blockPos[1] - 1]
      console.log({ dir, blockersInDir, blockPos, newStartPos })

      newMap = newMap.map((row, y) => {
        return row.map((col, x) => {
          if (blockPos[0] === x && blockPos[1] === y) {
            return col
          }

          if (startPos[0] === x && startPos[1] < y && y < blockPos[1]) {
            return "X"
          }

          return col
        })
      })
      break;
    }
    case 'l': {
      const blockersInDir = blockers.filter(block => block[0] < startPos[0] && block[1] === startPos[1]).sort((a, b) => b[0] - a[0])
      const blockPos = blockersInDir[0]
      if (!blockPos) {
        isDone = true

        newMap = newMap.map((row, y) => {
          return row.map((col, x) => {
            if (startPos[0] > x && startPos[1] === y) {
              return "X"
            }

            return col
          })
        })

        break
      }

      newStartPos = [blockPos[0] + 1, blockPos[1]]
      console.log({ dir, blockersInDir, blockPos, newStartPos })

      newMap = newMap.map((row, y) => {
        return row.map((col, x) => {
          if (blockPos[0] === x && blockPos[1] === y) {
            return col
          }

          if (startPos[0] > x && startPos[1] === y && x > blockPos[0]) {
            return "X"
          }

          return col
        })
      })
      break;
    }


    default:
      break;
  }

  return { map: newMap, startPos: newStartPos, isDone }
}

function route(map: string[][], blockers: number[][], startPos: number[]) {
  let isDone = false
  let currMap: string[][] = map
  let currPos: number[] = startPos
  let finalMap: string[][] = []

  while (!isDone) {
    let { map: uMap, startPos: uStartPos, isDone: uIsDone } = move(currMap, blockers, 'u', currPos)
    currMap = uMap
    currPos = uStartPos
    if (uIsDone) {
      finalMap = uMap
      isDone = true
    }
    let { map: rMap, startPos: rStartPos, isDone: rIsDone } = move(currMap, blockers, 'r', currPos)
    currMap = rMap
    currPos = rStartPos
    if (rIsDone) {
      finalMap = rMap
      isDone = true
    }
    let { map: dMap, startPos: dStartPos, isDone: dIsDone } = move(currMap, blockers, 'd', currPos)
    currMap = dMap
    currPos = dStartPos
    if (dIsDone) {
      finalMap = dMap
      isDone = true
    }
    let { map: lMap, startPos: lStartPos, isDone: lIsDone } = move(currMap, blockers, 'l', currPos)
    currMap = lMap
    currPos = lStartPos
    if (lIsDone) {
      finalMap = lMap
      isDone = true
    }
  }

  return finalMap

}

function printMap(map: string[][]) {
  const newMap = map.map(row => row.join("")).join("\n")
  console.log(newMap)
  return newMap
}

const part1 = (rawInput: string) => {
  const rawInput2 = `....#.....
  .........#
  ..........
  ..#.......
  .......#..
  ..........
  .#..^.....
  ........#.
  #.........
  ......#...`

  const { map, blockers, startPos } = parseInput(rawInput);
  console.log({ blockers, startPos })

  const finalMap = route(map, blockers, startPos)

  const total = finalMap.reduce((acc, row) => {
    const visited = row.filter(col => col === "X").length

    return acc += visited
  }, 0)

  const newMap = printMap(finalMap)
  fs.writeFileSync("output.txt", newMap)

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
