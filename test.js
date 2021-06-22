const axios = require('axios');

const getPong = async (message) => {
  const config = {
    data: { ping: message }
  };
  const result = await axios.get('http://localhost:3000/ping', config)
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
