/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const restaurantRouters = require('./src/routes/restaurant.route');
require('./src/models/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use('/restaurants', restaurantRouters);

/* Error handler middleware */
app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
