const fs = require("fs");

// ✅ Check if file exists
fs.access("data.txt", fs.constants.F_OK, (err) => {
  console.log(err ? "❌ File does NOT exist" : "✅ File exists");
});

// ✅ Read file asynchronously
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    console.log("📄 File Content:\n", data);
  }
});

// ✅ Write a new file
fs.writeFile("newfile.txt", "Hello Node.js!", (err) => {
  if (err) throw err;
  console.log("✅ File written successfully!");
});

// ✅ Read file line-by-line (using readline)
const readline = require("readline");
const fileStream = fs.createReadStream("data.txt");
const rl = readline.createInterface({ input: fileStream });
let lineCount = 0;

rl.on("line", () => (lineCount += 1));
rl.on("close", () => console.log(`📘 Total Lines: ${lineCount}`));
