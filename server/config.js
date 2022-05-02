require('dotenv').config();

const development = {
  port: process.env.PORT || 3001,
  domain: process.env.DOMAIN || 'localhost',
  database: process.env.DB || 'groupay',
};

module.exports = { development };
