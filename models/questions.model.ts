import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Questions extends Model { }

Questions.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, modelName: "questions",
});


export default Questions;