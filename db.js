const { Sequelize } = require("sequelize");
const db = new Sequelize(process.env.databaseName, process.env.root, process.env.password,{
    host: process.env.host,
    dialect: process.env.database,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: "30000",
        idle: "10000"
    }
});

module.exports = db;
