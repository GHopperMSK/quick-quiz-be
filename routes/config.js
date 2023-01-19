var express = require('express');
var router = express.Router();
const quizController = require('../src/controllers/quiz.controller');

router.get('/', quizController.findOne);

module.exports = router;