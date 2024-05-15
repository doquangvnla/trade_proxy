const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/proxy/*', (req, res) => {
  const url = req.url.replace('/proxy/', '');
  request(url).pipe(res);
});

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});
