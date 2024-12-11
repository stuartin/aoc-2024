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

function getSpaceBlocks(arr: string[]) {
  const spaces = []
  let currBlock = []
  for (let i = 0; i < arr.length; i++) {
    const unit = arr[i];
    if (unit === ".") {
      currBlock.push(unit);
    } else if (currBlock.length > 0) {
      spaces.push(currBlock);
      currBlock = [];
    }
  }

  if (currBlock.length > 0) {
    spaces.push(currBlock);
  }

  return spaces
}

function getFileBlocks(arr: string[]) {
  const result = [];
  let files: string[] = [];
  let startIdx = 0;

  for (let i = 0; i < arr.length; i++) {
    const unit = arr[i];

    if (unit === '.') {
      if (files.length > 0) {
        result.push({ startIdx, files });
        files = [];
      }
    } else {
      if (files.length === 0 || files[files.length - 1] === unit) {

        if (files.length === 0) {
          startIdx = i;
        }

        files.push(unit);
      } else {
        result.push({ startIdx, files });
        files = [unit];
        startIdx = i;
      }
    }
  }

  if (files.length > 0) {
    result.push({ startIdx, files });
  }

  return result;
}

function getDiskInfo(arr: string[]) {
  const spaces = getSpaceBlocks(arr)
  const fileBlocks = getFileBlocks(arr).filter((block) => spaces.map(s => s.length).some(length => block.files.length <= length))
  // console.log(arr)
  // console.log(fileBlocks)

  let spaceToFill = spaces.some(space => fileBlocks.map(({ files }) => files.length <= space.length))
  return { spaceToFill, spaces, fileBlocks }
}

function findSpace(arr: string[], length: number) {
  let consecutive = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ".") {
      consecutive++;
      if (consecutive === length) {
        return i - length + 1;
      }
    } else {
      consecutive = 0;
    }
  }

  return -1;
}

function defragWholeFiles(arr: string[]) {
  // console.log(arr.join(''))

  let { fileBlocks, spaceToFill } = getDiskInfo(arr)
  let currFile = fileBlocks.pop()
  while (currFile) {

    // console.log({ currFile })
    // console.log({ arr })
    if (!spaceToFill) {
      console.log('break')
      break
    }

    const space = findSpace(arr.slice(0, currFile.startIdx), currFile.files.length)
    if (space !== -1) {
      arr.splice(space, currFile.files.length, ...currFile.files)
      arr.splice(currFile.startIdx, currFile.files.length, ...Array.from({ length: currFile.files.length }).map(_ => "."))

      const diskInfo = getDiskInfo(arr)
      spaceToFill = diskInfo.spaceToFill
    }
    // console.log({ arr })
    currFile = fileBlocks.pop()
  }

  return arr
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
  // const rawInput2 = `2333133121414131402`
  // const input = parseInput(rawInput2);

  // const defragged = defrag(input)
  // const total = checksum(defragged)

  // return total;
};

const part2 = (rawInput: string) => {
  const rawInput2 = `2333133121414131402`
  const input = parseInput(rawInput);

  const defragged = defragWholeFiles(input)
  const total = checksum(defragged)

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
