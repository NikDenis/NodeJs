const http = require('http');
let countVisits1 = 1;
let countVisits2 = 1;
const server = http.createServer((req, res) => {
  console.log('Запрос получен!');

  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': "text/html; charset=UTF-8"
    });
    // pageCounter++;
    res.end(`<h1 style="text-align: center;">Корневая страница</h1><br>
    <span style="display: block;margin-bottom: 15px;text-align: right;">Просмотров:${countVisits1++}</span><br>
    <a href="/about" style="display: block;text-align: center;color: blue;font-weight: 700">Ссылка на страницу/about</a>`);
  } else if (req.url === '/about') {
    res.writeHead(200, {
      'Content-Type': "text/html; charset=UTF-8"
    });
    // pageCounter++;
    res.end(`<h1 style="text-align: center;">Страница about</h1><br>
    <span style="display: block;margin-bottom: 15px;text-align: right;">Просмотров:${countVisits2++}</span><br>
    <a href="/" style="display: block;text-align: center;color: blue;font-weight: 700">Ссылка на страницу/</a>`);
  } else {
    res.writeHead(404, {
      'Content-Type': "text/html; charset=UTF-8"
    });
    res.end('<h1>Страница не найдена!</h1>');
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Сервер запущен на ${port} порту!`);
});