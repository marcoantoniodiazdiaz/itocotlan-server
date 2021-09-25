import { Request, Response } from 'express';
import { router as app } from './router';
import Admins from '../models/admins.model';

app.get('/admins', async (req: Request, res: Response) => {
    try {
        const admins = await Admins.findAll();
        return res.json({ ok: true, data: admins });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/admins/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const admins = await Admins.findByPk(id);
        return res.json({ ok: true, data: admins });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/admins', async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const admins = await Admins.create({
            name: body.name,
            password: body.password,
        });

        return res.json({ ok: true, data: admins });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/admins/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const admins = await Admins.update({
            name: body.name,
            password: body.password,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: admins });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/admins/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const admins = await Admins.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: admins });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;