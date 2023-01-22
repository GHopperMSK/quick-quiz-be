import { Quiz } from "../models/quiz.model"
import { QuizRepository } from "../repositories/quiz.repository";

export class QuizService {
    static findByUuid(uuid: string) {
        return new Promise(function(resolve, reject) {
            QuizRepository.findByUuid(uuid)
                .then(function(quiz: Quiz) {     
                    resolve(quiz)
                }).catch(function(err: Error) {
                    reject(err)
                });
        })
    }
}