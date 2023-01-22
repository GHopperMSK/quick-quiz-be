import { database } from '../common/database';
import { RawAnswer } from "../models/rawAnswer.model";

export class RawAnswerRepository {
    static create(rawAnswer: RawAnswer) {
        return new Promise(function(resolve, reject) {
            database.query(`INSERT INTO raw_answer(quiz_uuid, lang, answer) VALUES($1, $2, $3)`, [
                    rawAnswer.quizUuid, 
                    rawAnswer.lang, 
                    rawAnswer.config
                ], function(err: Error | null, res: any) {
                if (err) {
                    reject(err);
                }
    
                resolve(null);
            });    
        });
    }
}

