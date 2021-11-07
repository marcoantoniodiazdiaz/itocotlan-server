import { Request, Response } from 'express';
import { router as app } from './router';
import Proyects from '../models/proyects.model';
import Categories from '../models/categories.model';

app.get('/proyects', async (req: Request, res: Response) => {
    try {
        const proyects = await Proyects.findAll({
            attributes: { exclude: ['categoryId'] },
            include: [
                {
                    model: Categories,
                }
            ],
        });
        return res.json({ ok: true, data: proyects });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/proyects/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const proyects = await Proyects.findByPk(id, {
            include: [
                {
                    model: Categories,
                }
            ],
        });
        return res.json({ ok: true, data: proyects });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/proyects', async (req: Request, res: Response) => {

    const body = req.body;

    try {

        const sum = await Proyects.sum('credits', { where: { categoryId: body.categoryId } });

        if (sum + +body.credits > 2) {
            return res.json({ ok: false, error: 'Se supera la cantidad permitida para esta categoria' });
        }

        const proyects = await Proyects.create({
            name: body.name,
            credits: body.credits,
            categoryId: body.categoryId,
        });

        return res.json({ ok: true, data: proyects });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/proyects/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {

        if (body.credits) {
            const sum = await Proyects.sum('credits', { where: { categoryId: body.categoryId } });

            if (sum + +body.credits > 2) {
                return res.json({ ok: false, error: 'Se supera la cantidad permitida para esta categoria' });
            }
        }

        const proyects = await Proyects.update({
            name: body.name,
            credits: body.credits,
            categoryId: body.categoryId,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: proyects });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/proyects/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const proyects = await Proyects.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: proyects });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;