require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authuser = require('./Routers/authRoutes');
const taskRoutes = require('./Routers/taskRoutes');

const cors = require('cors');

const { DatabaseLoader } = require('./loaders/DatabaseLoader');
//const { RoutesLoader } = require('./loaders/RoutesLoader');

const PORT = process.env.PORT || 8080;

app.use(express.json());



app.use(cors({
  origin: 'https://to-do-list-seven-sand.vercel.app'
}));

app.use('/auth', authuser);
app.use('/tasks', taskRoutes)
app.get('/', (req, res) => {
  return res.send("hello");
});

DatabaseLoader.init(app);
//RoutesLoader.initRoutes(app);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
