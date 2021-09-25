import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Careers extends Model { }

Careers.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, modelName: "careers",
});

export default Careers;