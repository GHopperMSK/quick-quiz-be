import { Quiz } from "../models/quiz.model";
import { Slide } from "../models/slide.model";

/* config?quiz_uuid=<uuid>&lang=<lang> */
exports.findOne = (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    
    let quizUuid = req.query.quiz_uuid
    if (!quizUuid) {
        res.status(400).send("quiz_uuid parameter is required")
        return
    }
    let lang = req.query.lang || "en";

    Promise.all([Slide.findByQuizUuid(quizUuid, lang), Quiz.findByUuid(quizUuid)])
        .then(function(result: any) {
            var slides: Slide[] = [];
            var config = {
                "version": 1.0,
                "init_slide": result[1].initSlideId,
                "slides": slides
            }

            result[0].forEach((slide: Slide) => {
                config.slides.push(slide);
            })

            res.json(config)
        }).catch(function(err) {
            res.status(500).send("Something wrong")
            console.error(err)
        });
};