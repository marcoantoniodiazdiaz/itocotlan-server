import { Request, Response } from 'express';
import { router as app } from './router';
import Requests from '../models/requests.model';

app.get('/requests', async (req: Request, res: Response) => {
    try {
        const requests = await Requests.findAll();
        return res.json({ ok: true, data: requests });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/requests/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const requests = await Requests.findByPk(id);
        return res.json({ ok: true, data: requests });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/requests', async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const requests = await Requests.create({
            authorized: body.authorized,
            description: body.description,
            authorizedBy: body.authorizedBy,
            activityId: body.activityId,
        });

        return res.json({ ok: true, data: requests });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/requests/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const requests = await Requests.update({
            name: body.name,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: requests });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/requests/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const requests = await Requests.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: requests });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;