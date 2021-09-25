import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Inscriptions extends Model { }

Inscriptions.init({
    // Id generado automaticamente
    // Student
    // Program
}, {
    sequelize, modelName: "inscriptions",
});

export default Inscriptions;