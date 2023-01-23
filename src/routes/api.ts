import express, { Request, Response } from 'express'
import { QuizController } from "../controllers/quiz.controller"
import { AnswerController } from '../controllers/answer.controller'
import { SlideService } from '../services/slide.service'
import { QuizService } from "../services/quiz.service"
import { RawAnswerService } from '../services/rawAnswer.service'
import { SlideRepository } from '../repositories/slide.repository'
import { QuizRepository } from '../repositories/quiz.repository'

var router = express.Router()

/* api/config?quiz_uuid=<uuid>&lang=<lang> */
router.get('/config', (req: Request, res: Response) => {
    const slideRepository = new SlideRepository
    const slideService = new SlideService(slideRepository)
    const quizRepository = new QuizRepository
    const quizService = new QuizService(quizRepository)
    const quizController = new QuizController(slideService, quizService)
    quizController.findOne(req, res)
})

router.options('/answer', function(req: Request, res: Response) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.send();
})

router.post('/answer', (req: Request, res: Response) => {
    const rawAnswerService = new RawAnswerService()
    const answerController = new AnswerController(rawAnswerService)
    answerController.create(req, res)
})

module.exports = router