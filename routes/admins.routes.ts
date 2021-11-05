import { Request, Response } from 'express';
import { router as app } from './router';
import Admins from '../models/admins.model';
import bcrypt from 'bcrypt';
import Roles from '../models/roles.model';

app.get('/admins', async (req: Request, res: Response) => {
    try {
        const admins = await Admins.findAll({
            attributes: {exclude: ['password', 'roleId'] },
            include: [
                {
                    model: Roles,
                }
            ],
        });
        return res.json({ ok: true, data: admins });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/admins/:id', async (req: Request, res: Response) => {
    
    const id = req.params.id;
    
    try {
        const admins = await Admins.findByPk(id, {
            attributes: {exclude: ['password', 'roleId'] },
            include: [
                {
                    model: Roles,
                }
            ],
        });
        return res.json({ ok: true, data: admins });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/roles', async (req: Request, res: Response) => {
    try {
        const roles = await Roles.findAll();
        return res.json({ ok: true, data: roles });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/admins', async (req: Request, res: Response) => {

    const body = req.body;

    try {

        const encryped = bcrypt.hashSync(body.password, 10);

        const admins = await Admins.create({
            name: body.name,
            password: encryped,
            roleId: body.roleId,
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
            roleId: body.roleId,
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