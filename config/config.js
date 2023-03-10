require("dotenv").config();
const { Pool } = require('sequelize-pool');
const pool = new Pool({
  create: () => sequelize,
  destroy: (connection) => connection.done(),
  validate: (connection) => connection.validate(),
  acquireTimeout: 10000,
  max: 50, // maximum number of connections
  min: 10, // minimum number of connections
  idle: 10000 // time before idle connections are closed
});
module.exports = 
{
  "development": {
    "username": process.env.DBNAME,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": "postgres"
    
  },
  "test": {
    "username": process.env.DBNAME,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DBNAME,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": "postgres"
  }
}
