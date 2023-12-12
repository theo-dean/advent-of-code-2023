const sampleInput =
  "467..114..\n" +
  "...*......\n" +
  "..35..633.\n" +
  "......#...\n" +
  "617*......\n" +
  ".....+.58.\n" +
  "..592.....\n" +
  "......755.\n" +
  "...$.*....\n" +
  ".664.598..";

const file = Deno.readTextFileSync("input", { encoding: "utf8" });

type Coords = {
  x: number;
  y: number;
};

type Number = {
  data: number;
  length: number;
} & Coords;

const getNumbers = (rows: string[]): Number[] => {
  return rows.flatMap((line, y) => {
    const regex = /\d+/g;
    let matches = [];
    let match;
    do {
      match = regex.exec(line);
      if (match) {
        matches.push({ data: parseInt(match[0]), length: match[0].length, x: match["index"], y });
      }
    } while (match);
    return matches;
  });
};

const getAdjacentCells = (matrix: string[][], number: Number): string[] => {
  let adj: string[] = [];

  for (let y = number.y - 1; y <= number.y + 1; y++) {
    for (let x = number.x - 1; x <= number.x + number.length; x++) {
      if (y < matrix.length && y >= 0 && x < matrix[y].length && x >= 0) {
        adj.push(matrix[y][x]);
      }
    }
  }
  return adj;
};
const solution = () => {
  const rows = file.split("\n");
  const matrix = rows.map((line) => line.split(""));

  const numbers = getNumbers(rows);

  const numbersWithAdjacentCells = numbers.map((num) => ({
    ...num,
    adjacent: getAdjacentCells(matrix, num),
  }));

  const sumOfValidNumbers = numbersWithAdjacentCells
    .filter((num) => num.adjacent.some((e) => /[^0-9.]/.test(e)))
    .reduce((acc, curr) => acc + curr.data, 0);

  return sumOfValidNumbers;
};

console.log(solution());
