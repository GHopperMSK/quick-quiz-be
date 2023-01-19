const merge = require('deepmerge');
const db = require('../db.js');

const Slide = function(id, quizUuid, lang, config) {
    this.id = id;
    this.quizUuid = quizUuid;
    this.lang = lang;
    this.config = config;
};

Slide.findByQuizUuid = (quizUuid, lang) => {
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
        
        db.query(sqlQuery, [quizUuid, lang], function(err, res) {
            if (err) {
                reject(err);
            }
            var slides = [];
            res.rows.forEach(slide => {
                const jsonConfig = slide.config 
                    ? merge(slide.default_config, slide.config) 
                    : slide.default_config;
                slides.push(new Slide(slide.id, slide.quiz_uuid, slide.lang, jsonConfig));
            });

            resolve(slides);
        });    
    });
};

module.exports = Slide;