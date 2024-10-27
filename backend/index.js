require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

const server = http.createServer(app);

const { DatabaseLoader } = require('./loaders/DatabaseLoader');
const { RoutesLoader } = require('./loaders/RoutesLoader');

const bodyParser = require('body-parser');

// Define the port
const PORT = process.env.PORT || 8080;

// Connect to MongoDB using the URI from .env


const corsOptions = {
  origin: 'https://to-do-list-seven-sand.vercel.app',
  // Allow this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(cookieParser());


app.options('*', cors());

DatabaseLoader.init(app);

RoutesLoader.initRoutes(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
