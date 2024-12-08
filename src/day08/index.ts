import run from "aocrunner";

const parseInput = (rawInput: string) => {
  class Antennas {

    map: string[][]
    availableSignals: string[]

    constructor(rawInput: string) {
      this.map = rawInput.split("\n").map(row => row.trim().split(""))

      this.availableSignals = this.map.reduce((acc, row) => {
        const rowSignals = new Set(row.filter(char => !acc.includes(char) && char !== "."))
        return [...acc, ...rowSignals]
      }, [])
    }

    printMap(antinodes: number[][]) {
      return this.map
        .map((row, y) => {
          return row.map((char, x) => {
            const antinode = antinodes.find(([aX, aY]) => aX === x && aY === y)
            if (antinode) {
              return "#"
            } else {
              return char
            }
          })
        })
        .map(row => {
          return row.join('')
        })
        .join("\n")
    }

    removeDuplicates(arr: number[][]) {
      return Array
        .from(new Set(arr.map((item) => JSON.stringify(item))))
        .map((item) => JSON.parse(item))
    }

    getMapBoundary() {
      const height = this.map.length
      const width = this.map[0].length
      return [width, height]
    }

    getSignals(char: string) {
      return this.map.reduce((positions, row, y) => {
        let matches: number[][] = []
        for (let x = 0; x < row.length; x++) {
          const col = row[x];
          if (col === char) {
            matches.push([x, y])
          }
        }

        return [...positions, ...matches]
      }, [] as number[][])
    }

    plotAntinodes(signals: number[][]) {

      let allAntinodes: number[][] = []
      for (let i = 0; i < signals.length; i++) {
        const signal = signals[i]
        const remainingSignals = signals.slice(i + 1)

        // console.log({ signal, remainingSignals })

        const signalAntinodes = remainingSignals
          .flatMap(([x, y]) => {

            if (signal[0] < x) {
              const delta = [x - signal[0], y - signal[1]]
              // console.log(1, { delta })
              return [[signal[0] - delta[0], signal[1] - delta[1]], [x + delta[0], y + delta[1]]]
            }

            if (signal[0] > x) {
              const delta = [signal[0] - x, signal[1] - y]
              // console.log(2, { delta })
              return [[signal[0] + delta[0], signal[1] + delta[1]], [x - delta[0], y - delta[1]]]
            }

            return []
          })

        allAntinodes = [...allAntinodes, ...signalAntinodes]
      }

      // console.log({ allAntinodes })

      return this.removeDuplicates(allAntinodes)
        .filter(([x, y]) => !signals.some(([sX, sY]) => x === sX && y === sY))
        .filter(([x, y]) => x < this.getMapBoundary()[0] && x >= 0 && y < this.getMapBoundary()[1] && y >= 0)
    }

    plotAntinodesWithResonatHarmonics(signals: number[][]) {

      let allAntinodes: number[][] = []
      for (let i = 0; i < signals.length; i++) {
        const signal = signals[i]
        const remainingSignals = signals.slice(i + 1)

        console.log({ signal, remainingSignals })

        const signalAntinodes = remainingSignals
          .flatMap(([x, y]) => {

            if (signal[0] < x) {
              const delta = [x - signal[0], y - signal[1]]
              console.log(1, { delta })

              // left
              let currLX = signal[0]
              let currLY = signal[1]
              let lefties: number[][] = []
              while (currLX >= 0 && currLY >= 0) {
                lefties = [...lefties, [currLX - delta[0], currLY - delta[1]]]
                currLX -= delta[0]
                currLY -= delta[1]
              }

              // right
              let currRX = x
              let currRY = y
              let righties: number[][] = []
              while (currRX <= this.getMapBoundary()[0] && currRY <= this.getMapBoundary()[1]) {
                righties = [...righties, [currRX + delta[0], currRY + delta[1]]]
                currRX += delta[0]
                currRY += delta[1]
              }

              console.log({ lefties, righties })

              return [...lefties, ...righties]
            }

            if (signal[0] > x) {
              const delta = [signal[0] - x, signal[1] - y]
              console.log(2, { delta })

              // left
              let currLX = x
              let currLY = y
              let lefties: number[][] = []
              while (currLX >= 0 && currLY >= 0) {
                lefties = [...lefties, [currLX - delta[0], currLY - delta[1]]]
                currLX -= delta[0]
                currLY -= delta[1]
              }

              // right
              let currRX = signal[0]
              let currRY = signal[1]
              let righties: number[][] = []
              while (currRX <= this.getMapBoundary()[0] && currRY <= this.getMapBoundary()[1]) {
                righties = [...righties, [currRX + delta[0], currRY + delta[1]]]
                currRX += delta[0]
                currRY += delta[1]
              }

              console.log({ lefties, righties })

              return [...lefties, ...righties]
            }

            return []
          })

        allAntinodes = [
          ...allAntinodes,
          ...signalAntinodes,
          // ...(remainingSignals.length > 0
          //   ? [[signal[0], signal[1]], [remainingSignals[0][0], remainingSignals[0][1]]]
          //   : [])
        ]
      }

      console.log({ allAntinodes })

      return this.removeDuplicates(allAntinodes)
        // .filter(([x, y]) => !signals.some(([sX, sY]) => x === sX && y === sY))
        .filter(([x, y]) => x < this.getMapBoundary()[0] && x >= 0 && y < this.getMapBoundary()[1] && y >= 0)
    }
  }

  return new Antennas(rawInput)
};

const part1 = (rawInput: string) => {
  // const rawInput2 = `............
  // ........0...
  // .....0......
  // .......0....
  // ....0.......
  // ......A.....
  // ............
  // ............
  // ........A...
  // .........A..
  // ............
  // ............`
  // const antennas = parseInput(rawInput);

  // console.log(antennas.availableSignals)

  // const antinodes = antennas.availableSignals.flatMap(signalChar => {
  //   const signals = antennas.getSignals(signalChar)
  //   const antinodes = antennas.plotAntinodes(signals)
  //   return antinodes
  // })

  // return antennas.removeDuplicates(antinodes).length;
};

const part2 = (rawInput: string) => {
  const rawInput2 = `T.........
  ...T......
  .T........
  ..........
  ..........
  ..........
  ..........
  ..........
  ..........
  ..........`
  const antennas = parseInput(rawInput2);

  console.log(antennas.availableSignals)

  const antinodes = antennas.availableSignals.flatMap(signalChar => {
    const signals = antennas.getSignals(signalChar)
    const antinodes = antennas.plotAntinodesWithResonatHarmonics(signals)
    return antinodes
  })

  console.log(antinodes.sort((a, b) => a[1] - b[1]))

  console.log(antennas.printMap(antinodes))

  return antinodes.length;
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
