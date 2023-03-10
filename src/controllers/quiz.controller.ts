import { Request, Response } from 'express';
import { Quiz } from "../models/quiz.model";
import { Slide } from "../models/slide.model";
import { SlideService } from '../services/slide.service'
import { QuizService } from "../services/quiz.service"

export class QuizController {
    private slideService: SlideService
    private quizService: QuizService

    constructor(slideService: SlideService, quizService: QuizService) {
        this.slideService = slideService
        this.quizService = quizService
    }

    findOne = (req: Request, res: Response) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        
        let quizUuid = <string>req.query.quiz_uuid
        if (!quizUuid) {
            res.status(400).send("quiz_uuid parameter is required")
            return
        }
        let lang = <string>req.query.lang || "en";
    
        Promise.all([this.slideService.findByQuizUuid(quizUuid, lang), this.quizService.findByUuid(quizUuid)])
            .then(function(result: any[]) {
                const quiz: Quiz = result[1];
                var slides: Slide[] = result[0];
                var config = {
                    "version": 1.0,
                    "init_slide": quiz.initSlideId,
                    "slides": slides
                }
                res.json(config)
            }).catch(function(err) {
                res.status(500).send("Something wrong")
                console.error(err)
            })
    }
}