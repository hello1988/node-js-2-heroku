const express = require('express');
const path = require('path');

const port = process.env.PORT || 5006;
const app = express();

// 特定路徑返回 JSON
app.get('/heroku.set', (req, res) => {
  const config = {
    url: process.env.APIURL || "https://testenv.com/",
  };
  res.json(config); // 返回 JSON 格式數據
});

// 提供靜態資源服務
app.use(express.static(path.join(__dirname, 'dist')));


// 捕獲沒有副檔名的路徑，返回 index.html
app.get(/^\/(?!.*\.\w+$).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 捕獲未知路徑並返回 404
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});