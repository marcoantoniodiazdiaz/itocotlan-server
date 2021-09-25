import { Request, Response } from 'express';
import { router as app } from './router';
import Categories from '../models/categories.model';

app.get('/categories', async (req: Request, res: Response) => {
    try {
        const categories = await Categories.findAll();
        return res.json({ ok: true, data: categories });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/categories/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const categories = await Categories.findByPk(id);
        return res.json({ ok: true, data: categories });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/categories', async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const categories = await Categories.create({
            name: body.name,
        });

        return res.json({ ok: true, data: categories });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/categories/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const categories = await Categories.update({
            name: body.name,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: categories });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/categories/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const categories = await Categories.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: categories });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;