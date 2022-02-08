import { Request, Response } from 'express';
import { router as app } from './router';
import Careers from '../models/careers.model';
import { tokenValidation } from '../middlewares/auth.middleware';

app.get('/careers', [tokenValidation], async (req: Request, res: Response) => {
    try {
        const careers = await Careers.findAll();
        return res.json({ ok: true, data: careers });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/careers/:id', [tokenValidation], async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const careers = await Careers.findByPk(id);
        return res.json({ ok: true, data: careers });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/careers', [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const careers = await Careers.create({
            name: body.name,
        });

        return res.json({ ok: true, data: careers });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/careers/:id', [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const careers = await Careers.update({
            name: body.name,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: careers });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/careers/:id', [tokenValidation], async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const careers = await Careers.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: careers });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;