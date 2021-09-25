import Careers from '../models/careers.model';
import Students from '../models/students.model';
import Inscriptions from '../models/inscriptions.model';
import Programs from '../models/programs.model';
import Activities from '../models/activities.model';
import Categories from '../models/categories.model';
import Admins from '../models/admins.model';



export const createAssosiations = () => {

    Careers.hasOne(Students);
    Students.belongsTo(Careers);

    Students.hasMany(Inscriptions);
    Inscriptions.belongsTo(Students);

    Programs.hasMany(Inscriptions);
    Inscriptions.belongsTo(Programs);

    Activities.hasMany(Programs);
    Programs.belongsTo(Activities);

    Categories.hasMany(Activities);
    Activities.belongsTo(Categories);

    Admins.init;

}

