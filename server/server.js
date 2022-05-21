const express = require('express');
const bodyParser = require('body-parser');
const { Inventory } = require('./models/inventory')

const port = process.env.PORT || 4200;
const app = express();

//SETTING CORS
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/inventory', (req, res) => {
 res.json({ data: Inventory })
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});

module.exports = { app };