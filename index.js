const express = require('express');
const path = require('path');

const port = process.env.PORT || 5006;
const app = express();

// 特定路徑返回 JSON
app.get('/heroku.set', (req, res) => {
  const config = {
    url: process.env.APIURL || "https://aum-dev-a2f659800b2b.herokuapp.com/",
  };
  res.json(config); // 返回 JSON 格式數據
});

// 將 /service/ 開頭的路徑導向到 service 資料夾
app.use('/service', express.static(path.join(__dirname, 'service')));

// 捕獲沒有副檔名但以 /service 開頭的路徑，返回 service/index.html
app.get(/^\/service(\/(?!.*\.\w+$).*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'service', 'index.html'));
});

// 提供靜態資源服務
app.use(express.static(path.join(__dirname, 'dist')));

// 捕獲沒有副檔名的路徑，返回 dist/index.html
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