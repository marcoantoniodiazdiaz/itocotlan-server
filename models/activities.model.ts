import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Activities extends Model { }

Activities.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Categories
}, {
    sequelize, modelName: "activities",
});

export default Activities;