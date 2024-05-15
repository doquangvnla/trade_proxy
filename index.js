const express = require('express');
const request = require('request');
const app = express();

// Middleware để thêm tiêu đề CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Route để xử lý yêu cầu proxy
app.get(['/proxy/*', '/proxy2/*'], (req, res) => {
  let url;
  if (req.url.startsWith('/proxy/')) {
    url = 'https://pixels-server.pixels.xyz/v1/marketplace/item/itm_wood?pid=6625e78954c3ca9674476554&v=';
  } else if (req.url.startsWith('/proxy2/')) {
    url = 'https://pixels-server.pixels.xyz/cache/marketplace/listings/count?v=';
  }
  console.log(`Proxying request to: ${url}`); // Log URL để gỡ lỗi
  request({ url, headers: { 'User-Agent': 'request' } })
    .on('response', (response) => {
      console.log(`Response status code: ${response.statusCode}`); // Log trạng thái phản hồi
    })
    .on('error', (err) => {
      console.error(`Request error: ${err.message}`); // Log lỗi nếu có
      res.status(500).send('Proxy error');
    })
    .pipe(res);
});



// Lắng nghe trên cổng do Vercel cung cấp
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
