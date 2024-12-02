import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const left: number[] = []
  const right: number[] = []
  rawInput.split("\n").forEach(line => {
    const [l, r] = line.split("   ")
    left.push(Number(l))
    right.push(Number(r))
  })

  return { left: left.sort(), right: right.sort() }
};

const part1 = (rawInput: string) => {
  const { left, right } = parseInput(rawInput);

  const total = left.reduce((acc, l, i) => {
    return acc + Math.abs(l - right[i])
  }, 0)

  return total;
};

const part2 = (rawInput: string) => {
  const { left, right } = parseInput(rawInput);

  const total = left.reduce((acc, l, i) => {
    const occurancesInRight = right.filter(r => r === l).length || 0
    return acc + (l * occurancesInRight)
  }, 0)

  return total;
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
