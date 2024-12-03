import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.match(/mul\(\d{1,3},\d{1,3}\)/g)?.filter(Boolean) as string[]
};

const parseInputP2 = (rawInput: string) => {
  return rawInput.match(/(mul\(\d{1,3},\d{1,3}\))|(do\(\)|don't\(\))/g)?.filter(Boolean) as string[]
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const result = input.reduce((acc, item) => {
    const [left, right] = item.replace('mul(', '').replace(')', '').split(',').map(Number)
    const total = left * right
    return acc + total
  }, 0)

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInputP2(rawInput);

  let isDo = true
  const result = input.reduce((acc, item) => {
    if (item === "don't()") {
      isDo = false
    } else if (item === "do()") {
      isDo = true
    }

    if (isDo && item !== "don't()" && item !== "do()") {
      const [left, right] = item.replace('mul(', '').replace(')', '').split(',').map(Number)
      const total = left * right
      acc += total
    }

    return acc
  }, 0)


  return result;
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
