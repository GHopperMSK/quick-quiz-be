var express = require('express');
var router = express.Router();
const answerController = require('../controllers/answer.controller');

router.options('/', function(req: any, res: any) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.send();
});
router.post('/', answerController.create);

module.exports = router;