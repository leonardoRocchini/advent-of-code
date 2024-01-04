const fs = require("fs");

const textNum = [
  { zero: "0ero" },
  { one: "1ne" },
  { two: "2wo" },
  { three: "3hree" },
  { four: "4our" },
  { five: "5ive" },
  { six: "6ix" },
  { seven: "7even" },
  { eight: "8ight" },
  { nine: "9ine" },
];

const formatLine = (line: string): string => {
  let partial = "";
  Array.from(line).forEach((character) => {
    partial += character;
    textNum.forEach((num) => {
      const [key, value] = Object.entries(num)[0];
      if (partial.includes(key)) {
        line = line.replace(key.toString(), value.toString());
      }
    });
  });
  return line;
};

const findCalibrationValue = (input: string[]): number => {
  let calibrationValue = 0;

  input.forEach((line) => {
    let lineCalibrationValue = "";
    const value = formatLine(line);
    for (let i = 0; i < value.length; i++) {
      let character = value[i];
      if (/[0-9]/.test(character)) {
        lineCalibrationValue = character;
        break;
      }
    }

    for (let i = value.length - 1; i >= 0; i--) {
      let character = value[i];
      if (/[0-9]/.test(character)) {
        lineCalibrationValue += character;
        break;
      }
    }
    calibrationValue += parseInt(lineCalibrationValue);
  });

  return calibrationValue;
};

const nomeFile = "input.txt";

fs.readFile(nomeFile, "utf8", function (err: Error, data: string) {
  if (err) {
    return console.error("Errore nella lettura del file:", err);
  }

  const array_di_stringhe = data.trim().split("\n");
  const res = findCalibrationValue(array_di_stringhe);

  console.log(res);
});
