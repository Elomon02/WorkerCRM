const {Router} = require('express')
const router = Router()

router.use('/department',require('./router/department'))
router.use('/worker',require('./router/worker'))


module.exports = router