const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const newsController = require('../controllers/NewsController');


router.get('/', newsController.index);
router.get('/:slug', newsController.show);



module.exports = router;