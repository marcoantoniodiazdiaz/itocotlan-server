import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Categories extends Model { }

Categories.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, modelName: "categories",
});

export default Categories;