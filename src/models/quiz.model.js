const db = require('../db.js');

const Quiz = function(quiz) {
    this.uuid = quiz.uuid;
    this.name = quiz.name;
    this.defaultLang = quiz.default_lang;
    this.initSlideId = quiz.init_slide_id;
};

Quiz.findByUuid = (uuid) => {
    return new Promise(function(resolve, reject) {
        db.query("SELECT * FROM public.quiz WHERE uuid = $1", [uuid], function(err, res) {
            if (err) {
                reject(err);
            }

            resolve(new Quiz(res.rows[0]));
        });    
    });
};

module.exports = Quiz;