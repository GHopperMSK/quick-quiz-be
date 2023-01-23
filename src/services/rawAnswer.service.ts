import { RawAnswer } from "../models/rawAnswer.model";
import rawAnswerRepository from "../repositories/rawAnswer.repository";

export class RawAnswerService {
    create = (rawAnswer: RawAnswer): Promise<null> => {
        return new Promise(function(resolve, reject) {
            rawAnswerRepository.create(rawAnswer)
                .then(function() {        
                    resolve(null)
                }).catch(function(err: Error) {
                    reject(err)
                });
        });
    }
}