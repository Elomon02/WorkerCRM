const {Router} = require('express')
const router = Router()

router.use('/department',require('./router/department'))
router.use('/worker',require('./router/worker'))
router.use('/task',require('./router/todo'))
router.use('/auth', require('./router/auth'))
router.use('/', require('./router/hbs'))


module.exports = router