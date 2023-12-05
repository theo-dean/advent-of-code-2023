import { readFileSync } from "fs";

const filePath = process.argv[2];
const file = readFileSync(filePath, { encoding: "utf8" });

const numbersByWords: { [key: string]: string } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const solution = file
  .split("\n")
  .map((line) => {
    let numbers: string[] = [];
    line.split("").forEach((val, index) => {
      Object.keys(numbersByWords).forEach((key) => {
        if (line.slice(index, index + key.length) === key) {
          numbers.push(numbersByWords[key]);
          return;
        }
      });
      if (val.match(/[0-9]/)) {
        numbers.push(val);
        return;
      }
    });
    return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(solution);
