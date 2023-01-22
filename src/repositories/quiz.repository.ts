import { database } from '../common/database';
import { Quiz } from '../models/quiz.model'

export class QuizRepository {
    static findByUuid(uuid: string) {
        return new Promise(function(resolve, reject) {
            database.query("SELECT * FROM public.quiz WHERE uuid = $1", [uuid], function(err: Error | null, res: any) {
                if (err) {
                    reject(err);
                }
    
                const quiz: Quiz = {
                    uuid: res.rows[0].uuid,
                    name: res.rows[0].name,
                    defaultLang: res.rows[0].default_lang,
                    initSlideId: res.rows[0].init_slide_id
                }
                resolve(quiz);
            })
        })
    }
}