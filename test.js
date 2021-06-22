const axios = require('axios');

const deployUrl = 'https://ping-pong-masters.herokuapp.com/ping'
const localUrl = 'http://localhost:3000/ping'

const getPong = async (message) => {
  const config = {
    data: { ping: message }
  };
  const result = await axios.get(deployUrl, config)
    .then(({ data }) => {
      if (data.pong) return data.pong;
      if (data.message) return data.message;
    })
  return result;
}
async function main() {
  let message = 'start';
  do {
    console.log(message);
    message = await getPong(message);
  } while (message !== 'Parabéns Ping Pong Master') {
  }
}

main();
