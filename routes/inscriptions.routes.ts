import { Request, Response } from 'express';
import { router as app } from './router';
import Inscriptions from '../models/inscriptions.model';
import Programs from '../models/programs.model';
import Activities from '../models/activities.model';
import Categories from '../models/categories.model';
import Students from '../models/students.model';
import Careers from '../models/careers.model';

app.get('/inscriptions', async (req: Request, res: Response) => {
    try {
        const inscriptions = await Inscriptions.findAll({
            attributes: { exclude: ['programId', 'studentId'] },
            include: [
                {
                    model: Programs,
                    attributes: { exclude: ['activityId'] },
                    include: [
                        {
                            model: Activities,
                            attributes: { exclude: ['categoryId'] },
                            include: [
                                {
                                    model: Categories,
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Students,
                    attributes: { exclude: ['careerId'] },
                    include: [
                        {
                            model: Careers,
                        }
                    ]
                }
            ]
        });
        return res.json({ ok: true, data: inscriptions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/inscriptions/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const inscriptions = await Inscriptions.findByPk(id, {
            attributes: { exclude: ['programId', 'studentId'] },
            include: [
                {
                    model: Programs,
                    attributes: { exclude: ['activityId'] },
                    include: [
                        {
                            model: Activities,
                            attributes: { exclude: ['categoryId'] },
                            include: [
                                {
                                    model: Categories,
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Students,
                    attributes: { exclude: ['careerId'] },
                    include: [
                        {
                            model: Careers,
                        }
                    ]
                }
            ]
        });
        return res.json({ ok: true, data: inscriptions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/inscriptions', async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const inscriptions = await Inscriptions.create({
            studentId: body.studentId,
            programId: body.programId,
        });

        return res.json({ ok: true, data: inscriptions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/inscriptions/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const inscriptions = await Inscriptions.update({
            studentId: body.studentId,
            programId: body.programId,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: inscriptions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/inscriptions/:id', async (req: Request, res: Response) => {

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