import { Request, Response } from 'express';
import { router as app } from './router';
import Requests from '../models/requests.model';
import Activities from '../models/activities.model';
import Administrators from '../models/admins.model';
import Proyects from '../models/proyects.model';
import Categories from '../models/categories.model';
import Roles from '../models/roles.model';
import { tokenValidation } from '../middlewares/auth.middleware';

app.get('/requests', [tokenValidation],async (req: Request, res: Response) => {
    try {
        const requests = await Requests.findAll({
            where: { authorized: false },
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

app.get('/requests/:id', [tokenValidation],async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const requests = await Requests.findByPk(id);
        return res.json({ ok: true, data: requests });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/requests/authorize', [tokenValidation],async (req: Request, res: Response) => {

    const body = req.body;
    const { requestId, administrator } = body;

    try {
        const requests = await Requests.update({
            authorized: true,
            authorizedBy: administrator
        }, {
            where: { id: requestId },
        });
        return res.json({ ok: true, data: requests });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/requests/reject', [tokenValidation],async (req: Request, res: Response) => {

    const body = req.body;
    const { requestId } = body;

    try {
        const requests = await Requests.update({
            authorized: false,
        }, {
            where: { id: requestId },
        });
        return res.json({ ok: true, data: requests });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/requests/:id', [tokenValidation],async (req: Request, res: Response) => {

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

app.delete('/requests/:id', [tokenValidation],async (req: Request, res: Response) => {

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