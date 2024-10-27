require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const cors = require('cors');

const { DatabaseLoader } = require('./loaders/DatabaseLoader');
const { RoutesLoader } = require('./loaders/RoutesLoader');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => { return res.send(<h1>hello</h1>) })

app.use(cors({
  origin: '*'
}));



// Load database and routes
DatabaseLoader.init(app);
RoutesLoader.initRoutes(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
