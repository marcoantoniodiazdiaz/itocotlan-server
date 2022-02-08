import { Request, Response } from 'express';
import { router as app } from './router';
import Questions from '../models/questions.model';
import Evaluations from '../models/evaluations.model';
import { tokenValidation } from '../middlewares/auth.middleware';

app.get('/questions',  [tokenValidation], async (req: Request, res: Response) => {
    try {
        const questions = await Questions.findAll();
        return res.json({ ok: true, data: questions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/questions/:id',  [tokenValidation], async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const questions = await Questions.findByPk(id);
        return res.json({ ok: true, data: questions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.get('/questions/inscription/:id',  [tokenValidation], async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const questions = await Evaluations.findAll({
            where: { inscriptionId: id },
            include: [
                {
                    model: Questions,
                }
            ]
        });
        return res.json({ ok: true, data: questions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/questions',  [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;

    try {
        const questions = await Questions.create({
            name: body.name,
        });

        return res.json({ ok: true, data: questions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.post('/questions/evaluation',  [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;

    try {

        await Evaluations.destroy({
            where: {
                questionId: body.questionId,
                inscriptionId: body.inscriptionId,
            }
        });

        const evaluation = await Evaluations.create({
            score: body.score,
            questionId: body.questionId,
            inscriptionId: body.inscriptionId,
        });

        return res.json({ ok: true, data: evaluation });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.put('/questions/:id',  [tokenValidation], async (req: Request, res: Response) => {

    const body = req.body;
    const id = req.params.id;

    try {
        const questions = await Questions.update({
            name: body.name,
        }, {
            where: { id }
        });

        return res.json({ ok: true, data: questions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

app.delete('/questions/:id',  [tokenValidation], async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const questions = await Questions.destroy({
            where: { id }
        });

        return res.json({ ok: true, data: questions });
    } catch (error) {
        return res.json({ ok: false, error });
    }
});

export default app;