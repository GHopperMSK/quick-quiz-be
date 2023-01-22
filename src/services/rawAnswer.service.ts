import { RawAnswer } from "../models/rawAnswer.model";
import { RawAnswerRepository } from "../repositories/rawAnswer.repository";

export class RawAnswerService {
    static create(rawAnswer: RawAnswer) {
        return new Promise(function(resolve, reject) {
            RawAnswerRepository.create(rawAnswer)
                .then(function() {        
                    resolve(null)
                }).catch(function(err: Error) {
                    reject(err)
                });
        });
    }
}