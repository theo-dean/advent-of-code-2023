import { readFileSync } from "fs";

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
  let adj: string[] = []

  for (let y = number.y-1; y <= number.y+1; y++){
    for (let x = number.x-1; x <= number.x+number.length; x++){
      if (y < matrix.length && y >=0 && x < matrix[y].length && x >= 0) {
        adj.push(matrix[y][x])
      }
    }
  }
  return adj;
}
const solution = () => {
  const lines = sampleInput.split("\n");
  const matrix = lines.map((line) => line.split(""));

  const symbols = matrix.map((line, y) =>
    line.map((char, x) => ({ data: char, x, y })).filter((symbol) => symbol.data !== "."),
  );

  const numbers = lines.map((line, y) =>
      ({matches: (/\d+/g.exec(line) as RegExpExecArray).filter(e => e !== null).map(match => ({number: parseInt(match[0]), length: match[0]}))})
  )

  //const blah = numbers.filter(match => match.match !== null).map(match => ({data: parseInt(match.match[0]), length: match.match[0].length, x: match.match["index"], y: match.y}));

  //const blah = numbers.map(num => ({
  //  ...num,
  //  adjacent: getAdjacent(matrix, num)
  //}));

  //const validNumbers = numbersWithAdjacent.filter(num => num.adjacent.some(e => /[^0-9.]/.test(e))).map(e => e.data)//.reduce((acc, curr) => acc+curr, 0);
  return numbers;
};

console.log(solution());
