import * as jwt from 'jsonwebtoken';

export const tokenValidation = (req: any, res: any, next: Function) => {
    const token: string = req.get('token')!;

    jwt.verify(token, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", (err, decoded: any) => {
        
        if (err) {
            res;
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'No tienes permisos para acceder a este recurso'
                }
            });
        }

        req.data = decoded.user;
        next();
    });
};
