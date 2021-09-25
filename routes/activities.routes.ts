import { Request, Response } from 'express';
import { router as app } from './router';
import Activities from '../models/activities.model';
import Categories from '../models/categories.model';

app.get('/activities', async (req: Request, res: Response) => {
    try {
        const activities = await Activities.findAll({
            attributes: { exclude: ['categoryId'] },
            include: [
                {
                    model: Categories,
                }
            ]
        });
        return res.json({ ok: true, data: activities });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/activities/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const activities = await Activities.findByPk(id, {
            attributes: { exclude: ['categoryId'] },
            include: [
                {
                    model: Categories,
                }
            ]
        });
        return res.json({ ok: true, data: activities });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/activities', async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const activities = await Activities.create({
            name: body.name,
            categoryId: body.categoryId,
        });

        return res.json({ ok: true, data: activities });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/activities/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const activities = await Activities.update({
            name: body.name,
            categoryId: body.categoryId,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: activities });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/activities/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const activities = await Activities.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: activities });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;