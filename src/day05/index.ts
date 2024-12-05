import run from "aocrunner";

type Input = {
  rules: number[][]
  pageUpdates: number[][]
  isRule: boolean
}

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").reduce((acc, line) => {

    if (line.trim() === '') {
      acc.isRule = false
      return acc
    }

    if (acc.isRule) {
      const rule = line.split("|").map(Number)
      acc.rules.push(rule)
    } else {
      const pages = line.split(',').map(Number)
      acc.pageUpdates.push(pages)
    }

    return acc
  }, { rules: [], pageUpdates: [], isRule: true } as Input)
};

function findPageRules(rules: number[][], page: number) {
  return rules.filter(rule => rule.includes(page))
}

const part1 = (rawInput: string) => {
  const rawInput2 = `47|53
  97|13
  97|61
  97|47
  75|29
  61|13
  75|53
  29|13
  97|29
  53|29
  61|53
  97|53
  61|29
  47|13
  75|47
  97|75
  47|61
  75|61
  47|29
  75|13
  53|13
  
  75,47,61,53,29
  97,61,53,29,13
  75,29,13
  75,97,47,61,53
  61,13,29
  97,13,75,29,47`

  const { rules, pageUpdates } = parseInput(rawInput);

  const results = pageUpdates.map(pages => {
    const isValidPages = pages.flatMap((page, i) => {
      const pageRules = findPageRules(rules, page).filter(([l, r]) => pages.includes(l) && pages.includes(r))
      if (pageRules.length === 0) {
        return []
      }

      const pagesRuledBefore = pageRules.filter(([l, r]) => r === page).map(([l, r]) => l)
      const pagesRuledAfter = pageRules.filter(([l, r]) => l === page).map(([l, r]) => r)
      const pagesBefore = pages.slice(0, i)
      const pagesAfter = pages.slice(i + 1, pages.length)
      // console.log({ page, pageRules, pagesRuledBefore, pagesBefore, pagesRuledAfter, pagesAfter })

      const isValidPage = pagesBefore.every(page => pagesRuledBefore.includes(page)) && pagesAfter.every(page => pagesRuledAfter.includes(page))

      return isValidPage
    })

    if (isValidPages.every(isValid => isValid === true)) {
      return pages
    } else {
      return []
    }

  })

  const total = results.filter(pages => pages.length > 0).reduce((total, pages) => {
    const midIdx = Math.floor(pages.length / 2);

    return total += pages[midIdx]
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
