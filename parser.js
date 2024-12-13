const fs = require('fs');
const path = require('path');

// .txt file -> json array
function parseCrosswordData(inputText) {
  const lines = inputText.split('\n');

  const crosswordData = [];

  lines.forEach(line => {
    if (line.trim() !== '') { 
      const clueAnswer = line.split(' - ').map(str => str.trim());

      if (clueAnswer.length === 2) { 
        const answer = clueAnswer[0].replace(/^\d+\.\s*/, ''); 
        const clue = clueAnswer[1];
        crosswordData.push({ clue, answer });
      } else {
        console.warn(`Skipping malformed line: "${line}"`);
      }
    }
  });

  // Return the json array
  return crosswordData;
}

const filePath = path.join(__dirname, 'response.txt');

// Read response.txt asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const crosswordJson = parseCrosswordData(data);

  const outputFilePath = path.join(__dirname, 'output.json');

  // Write to output.json file asynchronously
  fs.writeFile(outputFilePath, JSON.stringify(crosswordJson, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
    } else {
      console.log('Output successfully written to output.json');
    }
  });
});
