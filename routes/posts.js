const express = require('express');
const router = express.Router();
const postsController = require('../controllers/PostsController');
const verifyToken = require('../middleware/auths');


router.get('/', verifyToken, postsController.get);

router.post('/', verifyToken, postsController.post);
router.put('/:id', verifyToken, postsController.update);
router.delete('/:id', verifyToken, postsController.delete);


module.exports = router;