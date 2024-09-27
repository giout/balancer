require("dotenv/config.js");

const { Pool } = require("pg");

const uri = process.env.DB_URI;

const pool = new Pool({ 
    connectionString: uri,
    max: 25 
});

module.exports = pool;
