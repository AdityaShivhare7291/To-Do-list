require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);

const { DatabaseLoader } = require('./loaders/DatabaseLoader');
const { RoutesLoader } = require('./loaders/RoutesLoader');

const PORT = process.env.PORT || 8080;



app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Load database and routes
DatabaseLoader.init(app);
RoutesLoader.initRoutes(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
