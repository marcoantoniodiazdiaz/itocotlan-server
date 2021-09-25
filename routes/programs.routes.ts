import { Request, Response } from 'express';
import { router as app } from './router';
import Programs from '../models/programs.model';
import Activities from '../models/activities.model';
import { include } from 'underscore';
import Categories from '../models/categories.model';

app.get('/programs', async (req: Request, res: Response) => {
    try {
        const programs = await Programs.findAll({
            attributes: { exclude: ['activityId'] },
            include: [
                {
                    attributes: { exclude: ['categoryId'] },
                    model: Activities,
                    include: [
                        {
                            model: Categories
                        }
                    ]
                }
            ],
        });
        return res.json({ ok: true, data: programs });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/programs/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const programs = await Programs.findByPk(id);
        return res.json({ ok: true, data: programs });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/programs', async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const programs = await Programs.create({
            name: body.name,
            credits: body.credits,
            activityId: body.activityId,
        });

        return res.json({ ok: true, data: programs });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/programs/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const programs = await Programs.update({
            name: body.name,
            credits: body.credits,
            activityId: body.activityId,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: programs });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/programs/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const programs = await Programs.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: programs });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;