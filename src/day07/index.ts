import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(line => {
    const [answer, _numbers] = line.split(": ")
    const numbers = _numbers.trim().split(" ").map(Number)

    return {
      answer: Number(answer),
      numbers,
      operatorPositions: numbers.length - 1
    }

  })
};

function genOperatorCombos(operators: string[], length: number): string[][] {
  if (length === 1) {
    return operators.map(option => [option])
  }

  const combinations = genOperatorCombos(operators, length - 1);
  const result = [];

  for (const combination of combinations) {
    for (const operator of operators) {
      result.push([...combination, operator]);
    }
  }

  return result;
}

function concatNumber(first: number, second: number) {
  return Number(String(first) + String(second))
}

function calculate(equation: any[]) {

  const result = equation.reduce((acc, current, i) => {
    if (i === 0) {
      return acc
    }

    if (typeof current === 'string') {
      const nextNumber = equation[i + 1];

      if (typeof nextNumber === 'number') {
        switch (current) {
          case '||':
            return concatNumber(acc, nextNumber)
          case '*':
            return acc * nextNumber;
          case '+':
            return acc + nextNumber;
          default:
            break
        }
      }

    }
    return acc;
  }, equation[0] as number);

  return result
}



const part1 = (rawInput: string) => {
  const rawInput2 = `190: 10 19
  3267: 81 40 27
  83: 17 5
  156: 15 6
  7290: 6 8 6 15
  161011: 16 10 13
  192: 17 8 14
  21037: 9 7 18 13
  292: 11 6 16 20`

  const equations = parseInput(rawInput);

  const results = equations.flatMap(({ answer, numbers, operatorPositions }) => {

    let isSolvable = false

    const operatorCombos = genOperatorCombos(['+', '*'], operatorPositions)
    for (const combo of operatorCombos) {
      const equation = numbers.flatMap((number, index) => [number, combo[index]].filter(x => x !== undefined));
      const result = calculate(equation)
      if (result === answer) {
        // console.log({ answer, equation })
        isSolvable = true
        break
      }

    }

    if (isSolvable) {
      return answer
    } else {
      return []
    }
  })

  const total = results.reduce((total, curr) => {
    return total += curr
  }, 0)

  return total;
};

const part2 = (rawInput: string) => {
  const equations = parseInput(rawInput);

  const results = equations.flatMap(({ answer, numbers, operatorPositions }) => {

    let isSolvable = false

    const operatorCombos = genOperatorCombos(['+', '*', '||'], operatorPositions)
    for (const combo of operatorCombos) {
      const equation = numbers.flatMap((number, index) => [number, combo[index]].filter(x => x !== undefined));
      const result = calculate(equation)
      if (result === answer) {
        // console.log({ answer, equation })
        isSolvable = true
        break
      }

    }

    if (isSolvable) {
      return answer
    } else {
      return []
    }
  })

  const total = results.reduce((total, curr) => {
    return total += curr
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
