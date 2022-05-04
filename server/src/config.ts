require('dotenv').config();

const development = {
  port: process.env.PORT || 3001,
  domain: process.env.DOMAIN || 'localhost',
  database: process.env.DB || 'groupay',
};

if(process.env.APP_ENV == 'test'){
  development.database = 'groupay_test'
}

export { development };
