const {Router} = require('express')
const router = Router()
const {auth} = require('../middleware/auth')
const {get_all_department,add_new_department,get_one_department,delete_department,update_department}= require('../controllers/department')


router.route('/')
.all(auth)
.get(get_all_department)
.post(add_new_department)
.put(update_department)


router.route('/id')
.all(auth)
.delete(delete_department)
.get(get_one_department)

module.exports = router