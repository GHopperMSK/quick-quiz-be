const db = require('../db');

export class Quiz {
    uuid: string;
    name: string;
    defaultLang: string;
    initSlideId: number;

    constructor(uuid: string, name: string, defaultLang: string, initSlideId: number) {
        this.uuid = uuid;
        this.name = name;
        this.defaultLang = defaultLang;
        this.initSlideId = initSlideId;
    }

    static findByUuid(uuid: string) {
        return new Promise(function(resolve, reject) {
            db.query("SELECT * FROM public.quiz WHERE uuid = $1", [uuid], function(err: Error | null, res: any) {
                if (err) {
                    reject(err);
                }
    
                const quiz = new Quiz(res.rows[0].uuid, res.rows[0].name, res.rows[0].default_lang, res.rows[0].init_slide_id)
                resolve(quiz);
            });    
        });
    };
}

