const mysql = require('mysql2');
const path = require('path');
console.info('Environment is: ', process.env.CLASS_POINTS_ENV);
if (process.env.CLASS_POINTS_ENV)
  require('dotenv').config({ path: path.join(__dirname, `../.env.${process.env.CLASS_POINTS_ENV}`)});
else 
  require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  // port: process.env.DB_PORT, NOTE: DO NOT DO THIS, THIS SHOULD STILL BE 3306
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  
});

module.exports = db;

