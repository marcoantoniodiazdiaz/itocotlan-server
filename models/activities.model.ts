import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Activities extends Model { }

Activities.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credits: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    // Proyect
    // createdBy (Administrator)
}, {
    sequelize, modelName: "activities",
});

export default Activities;