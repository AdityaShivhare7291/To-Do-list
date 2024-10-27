require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const cors = require('cors');

const { DatabaseLoader } = require('./loaders/DatabaseLoader');
const { RoutesLoader } = require('./loaders/RoutesLoader');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.send("hello");
});

DatabaseLoader.init(app);
RoutesLoader.initRoutes(app);

// app.use(cors({
//   origin: 'https://to-do-list-seven-sand.vercel.app'
// }));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://to-do-list-seven-sand.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

// Load database and routes


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
