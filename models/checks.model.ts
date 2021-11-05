import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Checks extends Model { }

Checks.init({
    // Id generado automaticamente
    // Inscription (Inscriptions)
    // Aprove (Administrator)
}, {
    sequelize, modelName: "checks",
});

export default Checks;