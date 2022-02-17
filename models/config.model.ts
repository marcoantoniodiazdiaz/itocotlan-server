import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Configs extends Model { }

Configs.init({
    // Id generado automaticamente
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, modelName: "configs",
});

export default Configs;