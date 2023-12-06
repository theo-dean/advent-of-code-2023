import { readFileSync } from "fs";

const sampleInput = "467..114..\n" +
    "...*......\n" +
    "..35..633.\n" +
    "......#...\n" +
    "617*......\n" +
    ".....+.58.\n" +
    "..592.....\n" +
    "......755.\n" +
    "...$.*....\n" +
    ".664.598.."

const filePath = process.argv[2];
const file = readFileSync(filePath, { encoding: "utf8" });

type Coords = {
    x: number;
    y: number;
}

type Numbers = {
    data: number
} & Coords

type Symbols = {
    data: string
} & Coords

const solution = () => {
    const lines = sampleInput.split("\n");
    const matrix = lines.map(line => line.split(""));

    const pointsOfInterest =
        matrix.map((line, y) => line.map((char, x) => ({data: char, x, y})).filter(symbol => symbol.data !== "."))

}

console.log(solution())