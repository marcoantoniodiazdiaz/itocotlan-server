import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Proyects extends Model { }

Proyects.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Category
}, {
    sequelize, modelName: "proyects",
});

export default Proyects;