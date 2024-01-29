const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const Joi = require("joi");

const pathDB = path.join(__dirname, 'users.json')
let uniqueID = 1;
app.use(express.json());

const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(30)
    .required(),
  age: Joi.number()
    .integer()
    .min(0)
    .max(120)
    .required(),
  city: Joi.string()
    .min(1)
    .max(30)
})

function ReadFileData(file) {
  return JSON.parse(fs.readFileSync(file));
}
function WriteFileData(file, object) {
  return fs.writeFileSync(file, JSON.stringify(object, null, 2));
}

app.get('/users', (req, res) => {
  res.send(fs.readFileSync(pathDB))
})

app.get('/users/:id', (req, res) => {
  const users = ReadFileData(pathDB);
  const user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }

})

app.post('/users', (req, res) => {
  uniqueID += 1;
  const users = ReadFileData(pathDB);

  users.push({
    id: uniqueID,
    ...req.body
  });
  WriteFileData(pathDB, users);

  res.send({
    id: uniqueID
  });

});

app.put('/users/:id', (req, res) => {
  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }
  const users = ReadFileData(pathDB);
  let user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    user.city = req.body.city;
    // WriteFileData(pathDB, users);
    WriteFileData(pathDB, users);
    res.send({ user })
  } else {
    res.status(404);
    res.send({ user: null });
  }

});

app.delete('/users/:id', (req, res) => {
  const users = ReadFileData(pathDB);
  let user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    WriteFileData(pathDB, users);
    res.send({ user })
  } else {
    res.status(404);
    res.send({ user: null });
  }

});

app.listen(3000)