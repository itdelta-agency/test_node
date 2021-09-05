const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const apiRouter = require('./routes/apiRouter');

const cors = require('cors')

const app = express();
const port = 5000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);
app.use('/api/v1', apiRouter);

app.use(function (req, res, next) {
  const err = new Error('Endpoint not found!');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  })
});

app.listen(port, () => console.log(`Running on port ${port}`));
