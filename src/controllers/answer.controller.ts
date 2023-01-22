import { RawAnswer } from "../models/rawAnswer.model";
import { Request, Response } from 'express';
import { RawAnswerService } from '../services/rawAnswer.service'

export class AnswerController {
    static create(req: Request, res: Response) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
    
        const body = req.body
        const rawAnswer: RawAnswer = {
            quizUuid: body.quiz_uuid,
            lang: body.lang,
            config: JSON.stringify(body.slides)
        }
        RawAnswerService.create(rawAnswer)
            .then(function() {
                res.status(201).send(null)
            })
            .catch(function(err) {
                res.status(500).send("Something wrong")
                console.error(err)
            })
    }
}