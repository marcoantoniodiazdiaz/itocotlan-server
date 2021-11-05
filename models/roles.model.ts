import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Roles extends Model { }

Roles.init({
    // Id generado automaticamente
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, modelName: "roles",
});

export default Roles;