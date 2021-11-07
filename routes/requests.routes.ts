import { Request, Response } from 'express';
import { router as app } from './router';
import Requests from '../models/requests.model';
import Activities from '../models/activities.model';
import Administrators from '../models/admins.model';
import Proyects from '../models/proyects.model';
import Categories from '../models/categories.model';
import Roles from '../models/roles.model';

app.get('/requests', async (req: Request, res: Response) => {
    try {
        const requests = await Requests.findAll({
            attributes: { exclude: ['activityId', 'authorizedBy'] },
            include: [
                {
                    model: Activities,
                    attributes: { exclude: ['proyectId', 'createdBy'] },
                    include: [
                        {
                            model: Proyects,
                            attributes: { exclude: ['categoryId'] },
                            include: [
                                {
                                    model: Categories,
                                }
                            ],
                        },
                        {
                            model: Administrators,
                            attributes: { exclude: ['password', 'roleId'] },
                            as: 'creator',
                            include: [
                                {
                                    model: Roles,
                                }
                            ],
                        }
                    ],
                },
                {
                    model: Administrators,
                },
            ],
        });
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

app.put('/requests/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const requests = await Requests.update({
            authorized: body.authorized,
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