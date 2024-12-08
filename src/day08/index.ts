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
  }

  return new Antennas(rawInput)
};

const part1 = (rawInput: string) => {
  const rawInput2 = `............
  ........0...
  .....0......
  .......0....
  ....0.......
  ......A.....
  ............
  ............
  ........A...
  .........A..
  ............
  ............`
  const antennas = parseInput(rawInput);

  console.log(antennas.availableSignals)

  const antinodes = antennas.availableSignals.flatMap(signalChar => {
    const signals = antennas.getSignals(signalChar)
    const antinodes = antennas.plotAntinodes(signals)
    return antinodes
  })

  return antennas.removeDuplicates(antinodes).length;
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
