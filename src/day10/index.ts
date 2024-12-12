import run from "aocrunner";

const parseInput = (rawInput: string) => {

  class TrailMap {
    map: number[][]
    trailheads: number[][]

    constructor(rawInput: string) {
      this.map = rawInput.split("\n").map(row => row.trim().split("").map(col => parseInt(col)))

      this.trailheads = this.map.reduce((acc, row, y) => {
        const trailheads = row
          .map((char, x) => {
            if (char === 0) {
              return [x, y]
            } else {
              return []
            }
          })
          .filter(x => x.length > 0)

        return [...acc, ...trailheads]
      }, [] as number[][])
    }

    getMapBoundary() {
      const maxY = this.map.length - 1
      const maxX = this.map[0].length - 1
      return [maxX, maxY]
    }

    getSurrounding(position: number[]) {
      const [x, y] = position
      const t = {
        val: this.map[y - 1]?.[x],
        x,
        y: y - 1
      }
      const r = {
        val: this.map[y]?.[x + 1],
        x: x + 1,
        y
      }
      const b = {
        val: this.map[y + 1]?.[x],
        x,
        y: y + 1
      }
      const l = {
        val: this.map[y]?.[x - 1],
        x: x - 1,
        y
      }

      return [t, r, b, l].filter(({ val }) => val !== undefined)
    }

    walkTrail(start: { y: number, x: number }): Set<string> {
      const endPositions = new Set<string>();
      const visited = new Set<string>();
      const queue: { y: number, x: number, currentStep: number }[] = [
        { ...start, currentStep: 0 }
      ];

      while (queue.length > 0) {
        const { y, x, currentStep } = queue.shift()!;
        const posKey = `${y},${x}`;

        if (visited.has(posKey)) {
          continue
        } else {
          visited.add(posKey);
        }

        if (this.map[y][x] === 9) {
          endPositions.add(posKey);
        }

        const availableSteps = this.getSurrounding([x, y]);
        for (const step of availableSteps) {
          const nextStep = this.map[step.y][step.x];

          if (nextStep === currentStep + 1) {
            queue.push({
              y: step.y,
              x: step.x,
              currentStep: nextStep
            });
          }
        }
      }

      return endPositions;
    }

  }

  return new TrailMap(rawInput)

};

const part1 = (rawInput: string) => {
  const rawInput2 = `89010123
  78121874
  87430965
  96549874
  45678903
  32019012
  01329801
  10456732`
  const map = parseInput(rawInput);

  const scores = map.trailheads.map(trailhead => {
    const endPositions = map.walkTrail({ x: trailhead[0], y: trailhead[1] });
    return endPositions.size;
  });
  console.log({ scores })

  const total = scores.reduce((total, curr) => {
    return total += curr
  }, 0)

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
