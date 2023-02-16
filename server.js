const http = require('http');
const web3 = require('web3');
const ethSigUtil = require('eth-sig-util');

const obj = { nonce: 123456 }; // example object with a nonce property

const nonce = web3.utils.toHex(obj.nonce); // convert the nonce to a hex string
const normalizedNonce = ethSigUtil.normalize(nonce); // normalize the hex string

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/wallet.json') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    const jsonObj = { nonce: normalizedNonce };
    res.end(JSON.stringify(jsonObj));
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
