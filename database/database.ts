import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    database: 'itocotlan',
    host: 'localhost',
    password: 'keendc2000',
    username: 'root',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;
