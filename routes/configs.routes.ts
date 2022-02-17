import { Request, Response } from 'express';
import { router as app } from './router';
import { tokenValidation } from '../middlewares/auth.middleware';
import Configs from '../models/config.model';

app.get('/configs/:key', async (req: Request, res: Response) => {

    const key = req.params.key;

    try {
        const data = await Configs.findOne({ where: { key } });
        return res.json({ ok: true, data });
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, error });
    }
});



export default app;