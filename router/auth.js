const router = require('express').Router()

const {regUser,login} = require('../controllers/auth')

router.post('/reg', regUser)
router.post('/login', login)

module.exports = router