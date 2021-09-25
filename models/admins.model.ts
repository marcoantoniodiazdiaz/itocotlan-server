import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Admins extends Model { }

Admins.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, modelName: "admins",
});

export default Admins;