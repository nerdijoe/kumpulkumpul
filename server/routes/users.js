const router = require('express').Router();
const userController = require('../controllers/users')

router.get('/', userController.getAll)
router.put('/:id', userController.updateById)
router.delete('/:id', userController.deleteById)

module.exports = router;
