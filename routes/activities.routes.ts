import { Request, Response } from 'express';
import { router as app } from './router';
import Activities from '../models/activities.model';
import Categories from '../models/categories.model';
import Administrators from '../models/admins.model';
import Proyects from '../models/proyects.model';
import Roles from '../models/roles.model';
import sequelize from '../database/database';
import Requests from '../models/requests.model';

app.get('/activities', async (req: Request, res: Response) => {
    try {
        let activities = await Activities.findAll({
            attributes: { exclude: ['createdBy', 'proyectId']},
            include: [
                {
                    model: Administrators,
                    attributes: { exclude: ['password', 'roleId'] },
                    as: 'creator',
                    include: [
                        {
                            model: Roles,
                        }
                    ],
                },
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
                    model: Requests,
                },
            ],
        });

        activities = activities.filter((e) => {
            const requests: Requests[] = e.getDataValue('requests');
            for (const i of requests) {
                if (i.getDataValue('authorized')) return true
            }
            return false;
        });

        return res.json({ ok: true, data: activities });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/activities/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const activities = await Activities.findByPk(id, {
            attributes: { exclude: ['categoryId'] },
            include: [
                {
                    model: Categories,
                }
            ]
        });
        return res.json({ ok: true, data: activities });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/activities', async (req: Request, res: Response) => {

    const body = req.body;

    const t = await sequelize.transaction();

    try {

        // const sum = await Proyects.sum('credits', { where: { categoryId: body.categoryId } });

        // if (sum + +body.credits > 2) {
        //     throw 'Se supera la cantidad permitida para esta categoria';
        // }

        const activities = await Activities.create({
            name: body.name,
            createdBy: body.createdBy,
            proyectId: body.proyectId,
            credits: body.credits,
        }, { transaction: t });

        await Requests.create({
            description: body.description,
            activityId: activities.getDataValue('id'),
        }, { transaction: t })

        await t.commit();
        return res.json({ ok: true, data: activities });
    } catch (error) {
        await t.rollback();
        return res.json({ ok: false, error });
    }
});

app.put('/activities/:id', async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const activities = await Activities.update({
            name: body.name,
            categoryId: body.categoryId,
            createdBy: body.createdBy,
            proyectId: body.proyectId,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: activities });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/activities/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const activities = await Activities.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: activities });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;