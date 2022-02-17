import { Request, Response } from 'express';
import { router as app } from './router';
import Students from '../models/students.model';
import Careers from '../models/careers.model';
import { tokenValidation } from '../middlewares/auth.middleware';
import Inscriptions from '../models/inscriptions.model';

app.get('/students', [tokenValidation], async (req: Request, res: Response) => {
    try {
        const students = await Students.findAll({
            attributes: {
                exclude: ['careerId'],
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
                where: { studentId: student.getDataValue('id'), status: 1 }
            });

            data.push({student, credits});
        }

        return res.json({ ok: true, data });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/students/:id', [tokenValidation], async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const students = await Students.findByPk(id, {
            attributes: { exclude: ['careerId'] },
            include: [
                {
                    model: Careers,
                }
            ]
        });
        return res.json({ ok: true, data: students });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/students', [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const students = await Students.create({
            control: body.control,
            name: body.name,
            gender: body.gender,
            period: body.period,
            careerId: body.careerId,
        });

        return res.json({ ok: true, data: students });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/students/:id', [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const students = await Students.update({
            control: body.control,
            name: body.name,
            gender: body.gender,
            careerId: body.careerId,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: students });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/students/:id', [tokenValidation], async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const students = await Students.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: students });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;