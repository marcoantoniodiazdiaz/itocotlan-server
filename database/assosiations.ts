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

    Roles.hasMany(Administrators);
    Administrators.belongsTo(Roles);

    Administrators.hasOne(Requests, { foreignKey: 'authorizedBy' });
    Requests.belongsTo(Administrators, { foreignKey: 'authorizedBy' });

    Administrators.hasOne(Activities, { foreignKey: 'createdBy', as: 'creator' });
    Activities.belongsTo(Administrators, { foreignKey: 'createdBy', as: 'creator' });

    Proyects.hasMany(Activities);
    Activities.belongsTo(Proyects);

    Categories.hasMany(Proyects);
    Proyects.belongsTo(Categories);

    Activities.hasMany(Requests);
    Requests.belongsTo(Activities);

    Activities.hasMany(Inscriptions);
    Inscriptions.belongsTo(Activities);

    Inscriptions.hasMany(Checks);
    Checks.belongsTo(Inscriptions);

    Students.hasMany(Inscriptions);
    Inscriptions.belongsTo(Students);

    Careers.hasMany(Students);
    Students.belongsTo(Careers);

    Administrators.hasOne(Checks, { foreignKey: 'aprove' });
    Checks.belongsTo(Administrators, { foreignKey: 'aprove' });

    Questions.hasMany(Evaluations);
    Evaluations.belongsTo(Questions);

    Inscriptions.hasMany(Evaluations);
    Evaluations.belongsTo(Questions);

    Administrators.hasMany(Activities);
    Activities.belongsTo(Administrators);

    Configs.init;
}


