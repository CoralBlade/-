const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// 读取 JSON 文件
const textsPath = path.join(__dirname, 'data', 'texts.json');
let texts;

try {
  const rawData = fs.readFileSync(textsPath);
  texts = JSON.parse(rawData);
  console.log(`Successfully loaded ${texts.length} texts from JSON file.`);
} catch (error) {
  console.error('Error reading texts.json:', error);
  texts = [];
}

function splitSentences(text) {
  return text.match(/[^。？！]+[。？！]/g) || [];
}

app.get('/', (req, res) => {
  const processedTexts = texts.map(text => ({
    wenyanwen: splitSentences(text.wenyanwen),
    xiandai: splitSentences(text.xiandai)
  }));
  console.log('Processed texts:', JSON.stringify(processedTexts, null, 2));
  res.render('index', { texts: processedTexts });
});

app.listen(port, () => {
  console.log(`网站运行在 http://localhost:${port}`);
  console.log(`JSON data file location: ${textsPath}`);
});