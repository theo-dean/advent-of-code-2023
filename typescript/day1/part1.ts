import { readFileSync } from "fs";

const file = readFileSync("day1/input", { encoding: "utf8" });

const solution = file
  .split("\n")
  .map((line) =>
    line
      .split("")
      .filter((val) => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(val))
      .join(""),
  )
  .map((line) => parseInt(`${line[0]}${line[line.length - 1]}`))
  .reduce((acc, curr) => acc + curr, 0);

console.log(solution);

console.log("blah");
