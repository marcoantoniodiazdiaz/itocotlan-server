import { Request, Response } from 'express';
import { router as app } from './router';
import Admins from '../models/admins.model';
import bcrypt from 'bcrypt';
import Roles from '../models/roles.model';
import { tokenValidation } from '../middlewares/auth.middleware';

app.get('/admins', [tokenValidation], async (req: Request, res: Response) => {
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

app.get('/admins/:id', [tokenValidation], async (req: Request, res: Response) => {
    
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

app.get('/roles', [tokenValidation], async (req: Request, res: Response) => {
    try {
        const roles = await Roles.findAll();
        return res.json({ ok: true, data: roles });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/admins', [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;

    try {

        const encryped = bcrypt.hashSync(body.password, 10);

        const admins = await Admins.create({
            name: body.name,
            email: body.email,
            password: encryped,
            roleId: body.roleId,
        });

        return res.json({ ok: true, data: admins });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/admins/:id', [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    const encryped = bcrypt.hashSync(body.password, 10);

    try {
        const admins = await Admins.update({
            name: body.name,
            password: encryped,
            roleId: body.roleId,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: admins });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/admins/:id', [tokenValidation], async (req: Request, res: Response) => {

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