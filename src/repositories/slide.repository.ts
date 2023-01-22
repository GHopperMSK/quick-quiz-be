const merge = require('deepmerge');
import { database } from '../common/database';
import { UnlocalizedSlide } from '../models/slide.model'

export class SlideRepository {
    static findByQuizUuid(quizUuid: string, lang: string) {
        return new Promise(function(resolve, reject) {
            const sqlQuery = `
                SELECT
                    s1.id,
                    s1.quiz_uuid,
                    CASE WHEN s2.lang IS NULL THEN s1.lang ELSE s2.lang END AS lang,
                    s1.config AS default_config,
                    s2.config
                FROM slide s1
                LEFT JOIN slide s2 ON s2.parent_id = s1.id AND s2.lang = $2
                WHERE s1.quiz_uuid = $1
                    AND s1.lang = (SELECT default_lang FROM quiz WHERE uuid = s1.quiz_uuid)`;
            
            database.query(sqlQuery, [quizUuid, lang], function(err: Error | null, res: any) {
                if (err) {
                    reject(err);
                }
    
                var slides: UnlocalizedSlide[] = [];
                res.rows.forEach((row: any) => {
                    const slide: UnlocalizedSlide = {
                        id: row.id,
                        lang: row.lang,
                        config: row.config,
                        defaultConfig: row.default_config,
                    }
                    slides.push(slide);
                });
    
                resolve(slides)
            })
        })
    }
}