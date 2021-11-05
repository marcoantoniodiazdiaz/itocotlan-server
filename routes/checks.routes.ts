import { Request, Response } from 'express';
import { router as app } from './router';
import Checks from '../models/checks.model';

app.get('/checks', async (req: Request, res: Response) => {
    try {
        const checks = await Checks.findAll();
        return res.json({ ok: true, data: checks });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/checks/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const checks = await Checks.findByPk(id);
        return res.json({ ok: true, data: checks });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/checks', async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const checks = await Checks.create({
            inscriptions: body.inscriptions,
            aprove: body.aprove,
        });

        return res.json({ ok: true, data: checks });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/checks/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const checks = await Checks.update({
            inscriptions: body.inscriptions,
            aprove: body.aprove,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: checks });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/checks/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const checks = await Checks.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: checks });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;