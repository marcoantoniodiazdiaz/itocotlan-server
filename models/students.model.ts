import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

export class Students extends Model { }

Students.init({
    // Id generado automaticamente
    control: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    period: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, modelName: "students",
});

export default Students;