const express = require('express')
const cors = require('cors')
const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json())
app.use(cors())

const makeRandomList = (size) => {
  const randomNumSet = new Set();

  while (randomNumSet.size !== size) {
    randomNumSet.add(Math.floor(Math.random() * 100) + 1);
  }

  const setToArray = [...randomNumSet];
  return setToArray;
};

const tryDict = {}

app.get('/ping', (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const { ping } = req.body;
  console.log(ip, ping);
  let nextNumber;
  console.log(tryDict[ip]);

  if (!tryDict[ip]) {
    tryDict[ip] = makeRandomList(100)
    nextNumber = tryDict[ip][0]
  } else {
    if (tryDict[ip] && tryDict[ip].findIndex((item) => ping == item) < 99) {
      const pingIndex = tryDict[ip].findIndex((item) => ping == item)
      nextNumber = tryDict[ip][pingIndex + 1]
    }
    else if (tryDict[ip].findIndex((item) => ping == item) == 99) {
      return res.status(200).json({ message: 'Parabéns é Mestre do Tênis de Mesa' })
    }
  }

  console.log(nextNumber);
  res.status(200).json({ pong: nextNumber })
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ message: 'Erro Interno' });
})

app.listen(PORT, console.log('Ouvindo na famigerada ' + PORT));

