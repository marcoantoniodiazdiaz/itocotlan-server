import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Requests extends Model { }

Requests.init({
    // Id generado automaticamente
    authorized: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT({ length: 'long'}),
    },
    // Authorized
    // Activity
}, {
    sequelize, modelName: "requests",
});

export default Requests;
