const fs = require('fs');
const express = require('express');
const app = express();

let counterVisits = {};
const dataCounterVisits = fs.readFileSync('counter.json');
counterVisits = JSON.parse(dataCounterVisits);

function SaveCounter(url) {
  if (url == '/') {
    counterVisits.urlIndex += 1;
  } else if (url == '/about') {
    counterVisits.urlAbout += 1;
  }

  const counterJson = JSON.stringify(counterVisits, null, 2);
  console.log(counterJson);
  fs.writeFileSync('counter.json', counterJson);
}

app.get('/', (req, res) => {
  SaveCounter('/');
  res.send(`
  <h1 style="text-align: center;">Главная страница</h1><br>
  <span style="display: block;margin-bottom: 15px;text-align: right;">Просмотров:${counterVisits.urlIndex}</span><br>
  <a href="/about" style="display: block;text-align: center;color: blue;font-weight: 700">Ссылка на страницу/about</a>`);
})

app.get('/about', (req, res) => {
  SaveCounter('/about');
  res.send(`
  <h1 style="text-align: center;">Cтраница о нас</h1><br>
  <span style="display: block;margin-bottom: 15px;text-align: right;">Просмотров:${counterVisits.urlAbout}</span><br>
  <a href="/" style="display: block;text-align: center;color: blue;font-weight: 700">Ссылка на главную страницу</a>`);
})

const port = 3000;
app.listen(port, () => {
  console.log('Сервер запущен!');
})