const fs = require("fs");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const pdfParse = require("pdf-parse");

async function parseFile(filePath, filename) {
  const ext = filename.split(".").pop().toLowerCase();

  if (ext === "csv") {
    return new Promise((resolve, reject) => {
      let results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    });
  }

  if (ext === "xlsx") {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  }

  if (ext === "pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return { text: pdfData.text };
  }

  throw new Error("Unsupported file format");
}

module.exports = parseFile;
