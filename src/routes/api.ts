import express, { Request, Response } from 'express'
import { QuizController } from "../controllers/quiz.controller"
import { AnswerController } from '../controllers/answer.controller'

var router = express.Router()

/* api/config?quiz_uuid=<uuid>&lang=<lang> */
router.get('/config', QuizController.findOne)

router.options('/answer', function(req: Request, res: Response) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.send();
})

router.post('/answer', AnswerController.create)


module.exports = router