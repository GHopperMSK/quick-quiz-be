const db = require('../db');

export class RawAnswer {
    quizUuid: string;
    lang: string;
    config: string;

    constructor(uuid: string, lang: string, config: string) {
        this.quizUuid = uuid;
        this.lang = lang;
        this.config = config;
    }

    static create(quizUuid: string, lang: string, config: string) {
        return new Promise(function(resolve, reject) {
            db.query(`INSERT INTO raw_answer(quiz_uuid, lang, answer) VALUES($1, $2, $3)`, [quizUuid, lang, config], function(err: Error | null, res: any) {
                if (err) {
                    reject(err);
                }
    
                resolve(null);
            });    
        });
    };
}

