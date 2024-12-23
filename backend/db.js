const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
 

//we first import the client from pg
//then we import enf.config

//then we intialize a a const by using client 
//const client = new client({
// in this we give the required pass and usernam and all we saved })
//then we do client.connect()
//we then use async .then and .catch 
