import { readFileSync } from "fs";
import { execa } from "execa";

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

const filePath = process.argv[2];
const file = readFileSync(filePath, { encoding: "utf8" });

type Coords = {
  x: number;
  y: number;
};

type Symbol = {
  data: string;
} & Coords;

type Number = {
  data: number;
  length: number;
} & Coords;

const getAdjacent = (matrix: string[][], number: Number): string[] => {
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
  const lines = file.split("\n");
  const matrix = lines.map((line) => line.split(""));

  const symbols = matrix.map((line, y) =>
    line.map((char, x) => ({ data: char, x, y })).filter((symbol) => symbol.data !== "."),
  );

  const numbers = lines.flatMap((line, y) => {
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

  const numbersWithAdjacent = numbers.map((num) => ({
    ...num,
    adjacent: getAdjacent(matrix, num),
  }));

  const sumOfValidNumbers = numbersWithAdjacent
    .filter((num) => num.adjacent.some((e) => /[^0-9.]/.test(e)))
    .map((e) => e.data)
    .reduce((acc, curr) => acc + curr, 0);

  return sumOfValidNumbers;
};

console.log(solution());
