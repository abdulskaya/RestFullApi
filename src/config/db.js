const db_config = require('./config.json')
const Sequelize = require('sequelize')

const connection = new Sequelize(db_config.development.database, db_config.development.username, db_config.development.password, {
    host: db_config.development.HOST,
    dialect: db_config.development.dialect,
    port : process.env.MYSQL_CONNECTION_STRING,
    logging : false
});

if (connection.authenticate()) {
    console.log('Db connected successfully');
}else {
    console.log('Db connection failed');
}

module.exports = connection;