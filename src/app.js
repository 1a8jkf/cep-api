const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cepRoutes = require('./routes/cepRoutes');

const app = express();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/cep', cepRoutes);

// health
app.get('/', (req, res) => res.json({ status: 'ok' }));

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
