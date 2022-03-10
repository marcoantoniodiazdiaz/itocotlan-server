import { Request, Response } from 'express';
import { router as app } from './router';
import Proyects from '../models/proyects.model';
import Categories from '../models/categories.model';
import { tokenValidation } from '../middlewares/auth.middleware';

app.get('/proyects',  [tokenValidation], async (req: Request, res: Response) => {
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

app.get('/proyects/:id',  [tokenValidation], async (req: Request, res: Response) => {

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

app.post('/proyects',  [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const proyects = await Proyects.create({
            name: body.name,
            categoryId: body.categoryId,
        });

        return res.json({ ok: true, data: proyects });
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, error });
    }
});

app.put('/proyects/:id',  [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const proyects = await Proyects.update({
            name: body.name,
            categoryId: body.categoryId,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: proyects });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/proyects/:id',  [tokenValidation], async (req: Request, res: Response) => {

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