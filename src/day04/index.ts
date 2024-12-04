import run from "aocrunner";

const directions = ['ul', 'u', 'ur', 'r', 'dr', 'd', 'dl', 'l'] as const
type Direction = typeof directions[number]

const parseInput = (rawInput: string): string[][] => {
  return rawInput
    .split("\n")
    .map((row, rowIdx) => row.trim().split(''))
}

function getPt1Xmas(positions: string[][], startPosition: number[], dir: Direction) {
  const y = startPosition[0]
  const x = startPosition[1]

  let M: boolean | undefined = undefined
  let A: boolean | undefined = undefined
  let S: boolean | undefined = undefined

  switch (dir) {
    case "ul":
      M = positions[y - 1]?.[x - 1] === 'M'
      A = positions[y - 2]?.[x - 2] === 'A'
      S = positions[y - 3]?.[x - 3] === 'S'
      break;

    case "u":
      M = positions[y - 1]?.[x] === 'M'
      A = positions[y - 2]?.[x] === 'A'
      S = positions[y - 3]?.[x] === 'S'
      break;

    case "ur":
      M = positions[y - 1]?.[x + 1] === 'M'
      A = positions[y - 2]?.[x + 2] === 'A'
      S = positions[y - 3]?.[x + 3] === 'S'
      break;

    case "r":
      M = positions[y]?.[x + 1] === 'M'
      A = positions[y]?.[x + 2] === 'A'
      S = positions[y]?.[x + 3] === 'S'
      break;

    case "dr":
      M = positions[y + 1]?.[x + 1] === 'M'
      A = positions[y + 2]?.[x + 2] === 'A'
      S = positions[y + 3]?.[x + 3] === 'S'
      break;

    case "d":
      M = positions[y + 1]?.[x] === 'M'
      A = positions[y + 2]?.[x] === 'A'
      S = positions[y + 3]?.[x] === 'S'
      break;

    case "dl":
      M = positions[y + 1]?.[x - 1] === 'M'
      A = positions[y + 2]?.[x - 2] === 'A'
      S = positions[y + 3]?.[x - 3] === 'S'
      break;

    case "l":
      M = positions[y]?.[x - 1] === 'M'
      A = positions[y]?.[x - 2] === 'A'
      S = positions[y]?.[x - 3] === 'S'
      break;

    default:
      break;
  }
  if (M && A && S) {
    return true
  }

  return false
}

function getPt1AllXmas(positions: string[][], startPosition: number[]) {
  const validDirections = directions.map(dir => getPt1Xmas(positions, startPosition, dir)).filter(Boolean)
  return validDirections
}

function getPt2Xmas(positions: string[][], startPosition: number[]) {
  const y = startPosition[0]
  const x = startPosition[1]

  const topLeft = positions[y - 1]?.[x - 1]
  const topRight = positions[y - 1]?.[x + 1]
  const bttmRight = positions[y + 1]?.[x + 1]
  const bttmLeft = positions[y + 1]?.[x - 1]

  if (
    (topLeft === 'M' && bttmRight === 'S' && bttmLeft === 'S' && topRight === 'M') ||
    (topLeft === 'S' && bttmRight === 'M' && bttmLeft === 'M' && topRight === 'S') ||
    (topLeft === 'M' && bttmRight === 'S' && bttmLeft === 'M' && topRight === 'S') ||
    (topLeft === 'S' && bttmRight === 'M' && bttmLeft === 'S' && topRight === 'M')
  ) {
    return true
  }

  return false

}

const part1 = (rawInput: string) => {
  const positions = parseInput(rawInput);

  const results = positions.flatMap((row, rowIdx) => {
    return row.flatMap((col, colIdx) => {
      if (col === 'X') {
        const startPosition = [rowIdx, colIdx]
        return getPt1AllXmas(positions, startPosition)
      } else {
        return []
      }
    })
  })

  return results.length;
};

const part2 = (rawInput: string) => {
  const positions = parseInput(rawInput);

  const results = positions.flatMap((row, rowIdx) => {
    return row.flatMap((col, colIdx) => {
      if (col === 'A') {
        const startPosition = [rowIdx, colIdx]
        const match = getPt2Xmas(positions, startPosition)
        if (match) {
          return match
        } else {
          return []
        }
      } else {
        return []
      }
    })
  })

  return results.length;
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
