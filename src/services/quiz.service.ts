import { Quiz } from "../models/quiz.model"
import { QuizRepository } from "../repositories/quiz.repository";

export class QuizService {
    quizRepository: QuizRepository

    constructor(quizRepository: QuizRepository) {
        this.quizRepository = quizRepository
    }

    findByUuid = (uuid: string): Promise<Quiz> => {
        return new Promise((resolve, reject) => {
            this.quizRepository.findByUuid(uuid)
                .then(function(quiz: Quiz) {     
                    resolve(quiz)
                }).catch(function(err: Error) {
                    reject(err)
                });
        })
    }
}