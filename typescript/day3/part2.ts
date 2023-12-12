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
        matches.push({
          data: parseInt(match[0]),
          length: match[0].length,
          x: match["index"],
          y,
        });
      }
    } while (match);
    return matches;
  });
};

const getGears = (matrix: string[][]): Coords[] => {
  const symbols = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x].match(/\*/))
        symbols.push({
          x,
          y,
        });
    }
  }
  return symbols;
};

const solution = () => {
  const rows = file.split("\n");
  const matrix = rows.map((line) => line.split(""));

  const gears = getGears(matrix);
  const numbers = getNumbers(rows);

  const gearsWithAdjacentNumbers = gears.map((g) => ({
    ...g,
    adjacent: numbers.filter(
      (n) =>
        n.y >= g.y - 1 &&
        n.y <= g.y + 1 &&
        n.x + n.length - 1 >= g.x - 1 &&
        n.x <= g.x + 1,
    ),
  }));

  const sumOfValidGears = gearsWithAdjacentNumbers.filter(g => g.adjacent.length === 2).reduce((acc, curr) => acc + (curr.adjacent[0].data * curr.adjacent[1].data), 0)
  return sumOfValidGears;
};

console.log(solution());
