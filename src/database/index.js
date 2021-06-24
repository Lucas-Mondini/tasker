const knex = require('knex');
const connection = knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: "3306",
        database: "sql10418593",
        user: "root",
        password: "1234"
    }
});

module.exports = connection;