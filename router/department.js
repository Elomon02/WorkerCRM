const {Router} = require('express')
const router = Router()

const {get_all_department,add_new_department,get_one_department,delete_department,update_department}= require('../controllers/department')


router.get('/',get_all_department)
router.get('/:id',get_one_department)
router.post('/',add_new_department)
router.delete('/:id',delete_department)
router.put('/',update_department)

module.exports = router