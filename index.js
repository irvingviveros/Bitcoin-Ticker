const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){

    const crypto = req.body.crypto;
    const fiat = req.body.fiat;
    const amount = req.body.amout;

    const options = {
      url: "https://apiv2.bitcoinaverage.com/convert/global",
      method: "GET",
      qs: {
        from: crypto,
        to: fiat,
        amount: amount
      }
    };

    request(options, function(error, response, body){

    let data = JSON.parse(body);
    let price = data.price;
    res.send('<h1>The price of ' + crypto + ' is: ' + price + ' ' + fiat + '</h1>');
})
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
