import Careers from '../models/careers.model';
import Students from '../models/students.model';
import Inscriptions from '../models/inscriptions.model';
import Programs from '../models/proyects.model';
import Activities from '../models/activities.model';
import Categories from '../models/categories.model';
import Roles from '../models/roles.model';
import Administrators from '../models/admins.model';
import Requests from '../models/requests.model';
import Proyects from '../models/proyects.model';
import Checks from '../models/checks.model';
import Evaluations from '../models/evaluations.model';
import Questions from '../models/questions.model';
import Configs from '../models/config.model';

export const createAssosiations = () => {

    Roles.hasMany(Administrators, { onDelete: 'CASCADE' } );
    Administrators.belongsTo(Roles, { onDelete: 'CASCADE' });

    Administrators.hasOne(Requests, { foreignKey: 'authorizedBy', onDelete: 'CASCADE' });
    Requests.belongsTo(Administrators, { foreignKey: 'authorizedBy', onDelete: 'CASCADE' });

    Administrators.hasOne(Activities, { foreignKey: 'createdBy', as: 'creator', onDelete: 'CASCADE' });
    Activities.belongsTo(Administrators, { foreignKey: 'createdBy', as: 'creator', onDelete: 'CASCADE' });

    Proyects.hasMany(Activities, { onDelete: 'CASCADE' });
    Activities.belongsTo(Proyects, { onDelete: 'CASCADE' });

    Categories.hasMany(Proyects, { onDelete: 'CASCADE' });
    Proyects.belongsTo(Categories, { onDelete: 'CASCADE' });

    Activities.hasMany(Requests, { onDelete: 'CASCADE' });
    Requests.belongsTo(Activities, { onDelete: 'CASCADE' });

    Activities.hasMany(Inscriptions, { onDelete: 'CASCADE' });
    Inscriptions.belongsTo(Activities, { onDelete: 'CASCADE' });

    Inscriptions.hasMany(Checks, { onDelete: 'CASCADE' });
    Checks.belongsTo(Inscriptions, { onDelete: 'CASCADE' });

    Students.hasMany(Inscriptions, { onDelete: 'CASCADE' });
    Inscriptions.belongsTo(Students, { onDelete: 'CASCADE' });

    Careers.hasMany(Students, { onDelete: 'CASCADE' });
    Students.belongsTo(Careers, { onDelete: 'CASCADE' });

    Administrators.hasOne(Checks, { foreignKey: 'aprove', onDelete: 'CASCADE' });
    Checks.belongsTo(Administrators, { foreignKey: 'aprove', onDelete: 'CASCADE' });

    Questions.hasMany(Evaluations, { onDelete: 'CASCADE' });
    Evaluations.belongsTo(Questions, { onDelete: 'CASCADE' });

    Inscriptions.hasMany(Evaluations, { onDelete: 'CASCADE' });
    Evaluations.belongsTo(Questions, { onDelete: 'CASCADE' });

    Administrators.hasMany(Activities, { onDelete: 'CASCADE' });
    Activities.belongsTo(Administrators, { onDelete: 'CASCADE' });

    Configs.init;
}


