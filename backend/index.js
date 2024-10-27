require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);

const { DatabaseLoader } = require('./loaders/DatabaseLoader');
const { RoutesLoader } = require('./loaders/RoutesLoader');

const PORT = process.env.PORT || 8080;

// Define CORS options
const corsOptions = {
  origin: 'https://to-do-list-seven-sand.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS with options
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Load database and routes
DatabaseLoader.init(app);
RoutesLoader.initRoutes(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
