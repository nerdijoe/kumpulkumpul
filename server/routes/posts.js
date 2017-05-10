const router = require('express').Router();
const postController = require('../controllers/posts')
let helper = require('../helpers/auth_verify')
let helperJob = require('../helpers/cron_job_email')

router.get('/', helper.auth, postController.getAll)
router.get('/:id', helper.auth, postController.getById)
router.post('/', helper.auth,  postController.insertOne) // helperJob.reminder_eventByEmail
router.put('/:id', helper.auth, postController.updateById)
router.delete('/:id', helper.auth, postController.deleteById)

module.exports = router;
