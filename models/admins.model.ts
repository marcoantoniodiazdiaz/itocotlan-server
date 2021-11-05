import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Administrators extends Model { }

Administrators.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Role
}, {
    sequelize, modelName: "administrators",
});

export default Administrators;