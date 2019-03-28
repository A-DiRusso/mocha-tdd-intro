//first require 'pg-promise'
//call it immediately, which gives us a configured database connector
const pgp = require('pg-promise')({
    query: e => {
        console.log('QUERY: ', e.query);
    }
});
//next, define the connectons options
const options = {
    host: 'localhost',
    database: 'A-DiRusso_welp'
};

//make a connection to the database specified by the optoins object
const db = pgp(options);
module.exports = db;
