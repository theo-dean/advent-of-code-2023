import { readFileSync } from "fs";

const file = readFileSync("day1/input", { encoding: "utf8" });

const solution = file
  .split("\n")
  .map((line) => line.replace(/[^0-9]/g, ""))
  .map((line) => parseInt(`${line[0]}${line[line.length - 1]}`))
  .reduce((acc, curr) => acc + curr, 0);

console.log(solution);
