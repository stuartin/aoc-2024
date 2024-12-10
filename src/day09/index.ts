import run from "aocrunner";

const parseInput = (rawInput: string) => {

  const output: string[] = []
  const arr = rawInput.trim().split("")
  for (let i = 0; i < arr.length; i++) {
    const unit = parseInt(arr[i])

    if (i % 2 === 0) {
      const unitArr = Array.from({ length: unit }).map(_ => String(i / 2))
      output.push(...unitArr)
    } else {
      const unitArr = Array.from({ length: unit }).map(_ => ".")
      output.push(...unitArr.map(_ => "."))
    }

  }

  return output
};

function defrag(arr: any[]) {
  const files = arr.filter(unit => unit !== ".");
  const spaces = arr.filter(unit => unit === ".")

  let spaceIdx: number = arr.indexOf(".")
  for (let i = 0; i < spaces.length; i++) {

    spaceIdx = arr.indexOf(".")
    const lastFileIdx = arr.lastIndexOf(files[files.length - 1])

    const filled = arr.slice(spaceIdx, arr.length - 1).every(unit => unit === ".")
    if (!filled) {
      arr[spaceIdx] = files.pop()
      arr[lastFileIdx] = "."
    } else {
      break
    }
  }

  for (let i = spaceIdx; i < arr.length; i++) {
    arr[i] = ".";
  }
  return arr;
}

function checksum(arr: any[]) {
  return arr.reduce((total, curr, i) => {
    if (curr === ".") {
      return total
    }

    const mult = i * parseInt(curr)
    return total += mult
  }, 0)

}

const part1 = (rawInput: string) => {
  const rawInput2 = `2333133121414131402`
  const input = parseInput(rawInput);

  const defragged = defrag(input)
  const total = checksum(defragged)

  return total;
};

const part2 = (rawInput: string) => {
  // const input = parseInput(rawInput);

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
