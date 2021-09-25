import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Programs extends Model { }

Programs.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credits: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    // Activity
}, {
    sequelize, modelName: "programs",
});

export default Programs;