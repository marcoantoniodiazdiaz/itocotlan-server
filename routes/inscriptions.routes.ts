import { Request, Response } from 'express';
import { router as app } from './router';
import Inscriptions from '../models/inscriptions.model';
import Activities from '../models/activities.model';
import Categories from '../models/categories.model';
import Students from '../models/students.model';
import Careers from '../models/careers.model';
import Proyects from '../models/proyects.model';
import { Op } from 'sequelize';
import { tokenValidation } from '../middlewares/auth.middleware';

app.get('/inscriptions', [tokenValidation], async (req: Request, res: Response) => {
    try {
        const inscriptions = await Inscriptions.findAll({
            attributes: { exclude: ['programId', 'studentId', 'activityId'] },
            include: [
                {
                    model: Students,
                    attributes: { exclude: ['careerId'] },
                    include: [
                        {
                            model: Careers,
                        }
                    ]
                },
                {
                    model: Activities,
                    attributes: { exclude: ['proyectId'] },
                    include: [
                        {
                            attributes: { exclude: ['categoryId'] },
                            model: Proyects,
                            include: [
                                {
                                    model: Categories,
                                },
                            ]
                        },
                    ]
                }
            ]
        });
        return res.json({ ok: true, data: inscriptions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/inscriptions/:id', [tokenValidation], async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const inscriptions = await Inscriptions.findByPk(id, {
            attributes: { exclude: ['programId', 'studentId'] },
            include: [
                {
                    model: Students,
                    attributes: { exclude: ['careerId'] },
                    include: [
                        {
                            model: Careers,
                        }
                    ]
                },
                {
                    model: Activities,
                    attributes: { exclude: ['proyectId'] },
                    include: [
                        {
                            attributes: { exclude: ['categoryId'] },
                            model: Proyects,
                            include: [
                                {
                                    model: Categories,
                                },
                            ]
                        },
                    ]
                }
            ]
        });
        return res.json({ ok: true, data: inscriptions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/inscriptions/filter/:cantMin/:cantMax/:perMin/:perMax', [tokenValidation], async (req: Request, res: Response) => {
    
    try {
        const { cantMin, cantMax, perMin, perMax } = req.params;


        const students = await Students.findAll({
            where: {
                period: {
                    [Op.gte]: perMin,
                    [Op.lte]: perMax,
                }
            },
            include: [
                {
                    model: Careers,
                }
            ]
        });

        const data: { student: Students, credits: number }[] = [];

        for (const student of students) {
            const credits = await Inscriptions.count({
                where: {
                    studentId: student.getDataValue('id'),
                    status: 1,
                },
            });

            if (cantMin <= credits && cantMax >= credits) {
                data.push({ student, credits })
            }
        }
    
        return res.json({ ok: true, data });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/inscriptions', [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const inscriptions = await Inscriptions.create({
            activityId: body.activityId,
            studentId: body.studentId,
        });

        return res.json({ ok: true, data: inscriptions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/inscriptions/:id', [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const inscriptions = await Inscriptions.update({
            status: body.status,
            activityId: body.activityId,
            studentId: body.studentId,
        }, {
            where: { id }
        });
        
        return res.json({ ok: true, data: inscriptions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/inscriptions/:id', [tokenValidation], async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const inscriptions = await Inscriptions.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: inscriptions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;