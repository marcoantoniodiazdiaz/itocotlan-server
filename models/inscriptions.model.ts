import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Inscriptions extends Model { }

Inscriptions.init({
    // Id generado automaticamente
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    // Student
    // Activity
}, {
    sequelize, modelName: "inscriptions",
});

export default Inscriptions;