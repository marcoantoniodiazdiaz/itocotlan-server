import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Evaluations extends Model { }

Evaluations.init({
    // Id generado automaticamente
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize, modelName: "evaluations",
});

export default Evaluations;