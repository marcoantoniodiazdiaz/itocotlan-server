import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Requests extends Model { }

Requests.init({
    // Id generado automaticamente
    authorized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
