import { Request, Response } from 'express';

import { router as app } from './router';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Administrators from '../models/admins.model';

app.post('/login', async (req: Request, res: Response) => {

    const body = req.body;

    if (body.password === '' || body.email === '') {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }

    try {
        const user = await Administrators.findOne({
            where: { email: body.email }
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                err: 'Este correo no pertenece a ningun usuario',
            });
        }

        if (!bcrypt.compareSync(body.password, user.getDataValue('password'))) {
            return res.status(400).json({
                ok: false,
                err: 'La contraseña es incorrecta',
            });
        }

        const token = jwt.sign(
            { user }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '60d' }
        );

        return res.json({
            ok: true,
            data: user,
            token,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            err: 'Ocurrio un error inesperado, porfavor, contacte con soporte',
            message: error,
        });
    }
});


export default app;