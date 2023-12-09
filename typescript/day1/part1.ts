import { readFileSync } from "fs";

const file = Deno.readTextFileSync("input", { encoding: "utf8" });

const solution = file
  .split("\n")
  .map((line) => {
    const numbers = line.replace(/[^0-9]/g, "");
    return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(solution);
