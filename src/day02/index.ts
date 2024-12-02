import run from "aocrunner";

const isAscending = (report: number[]) => report.every((level, i) => i === 0 || level >= report[i - 1])
const isDescending = (report: number[]) => report.every((level, i) => i === 0 || level <= report[i - 1])
const isInRange = (report: number[]) => report.every((level, i) => i === 0 || (Math.abs(level - report[i - 1]) >= 1 && Math.abs(level - report[i - 1]) <= 3))

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(report => report.split(" ").map(level => Number(level)))
};

const part1 = (rawInput: string) => {
  const reports = parseInput(rawInput);

  const safeReports = reports.flatMap(report => {
    if ((isAscending(report) || isDescending(report)) && isInRange(report)) {
      return true
    } else {
      return []
    }
  })

  return safeReports.length
};

const part2 = (rawInput: string) => {
  const reports = parseInput(rawInput);

  const safeReports = reports.flatMap(report => {
    if ((isAscending(report) || isDescending(report)) && isInRange(report)) {
      return true
    } else {


      let validWithRemoved = false
      for (let i = 0; i < report.length; i++) {
        const removedLevelReport = report.slice(0, i).concat(report.slice(i + 1));
        if ((isAscending(removedLevelReport) || isDescending(removedLevelReport)) && isInRange(removedLevelReport)) {
          validWithRemoved = true;
          break
        }
      }

      if (validWithRemoved) {
        return true
      } else {
        return []
      }
    }
  })

  return safeReports.length;
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
