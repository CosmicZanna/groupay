const express = require('express');
const cors = require('cors');
const router = require('./router');
const app = express();
const middleware = require('./middleware/auth');
const mongoose = require('mongoose');
const { development } = require('./config');

app.use(cors());
app.use(middleware.decodeToken);
app.use(express.json());
app.use(router);

const PORT = development.port;

(async function bootstrap(){
  await mongoose.connect(`mongodb://${development.domain}/${development.database}`);
  console.log('Connection has been established successfully.');
  app.listen(PORT, ()=> console.log(`running on port ${PORT}`));
})()

module.exports = app;