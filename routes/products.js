const express = require('express');
const router = express.Router();
const productsController = require('../controllers/ProductsController');
const verifyToken = require('../middleware/auths');


router.get('/', productsController.get);
router.get('/:id', productsController.getId);

router.post('/', productsController.post);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);


module.exports = router;