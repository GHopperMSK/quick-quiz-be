import { RawAnswer } from "../models/rawAnswer.model";

exports.create = (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)

    const body = req.body
    RawAnswer.create(body.quiz_uuid, body.lang, JSON.stringify(body.slides))
    res.status(201).send(null)
};