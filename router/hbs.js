const router = require('express').Router()


const {home,about,departments,department,newdepartment,adddepartmnet,workers,addworkers,person,newworker} = require('../controllers/hbs')

router.get('/',home)
router.get('/about',about)
router.get('/depart',departments)
router.get('/depart/:id',department)
router.get('/newdepartment',newdepartment)
router.get('/workers', workers)
router.get('/workers/:id', person)
router.get('/addworker',newworker)

router.post('/newdepartment', adddepartmnet)
router.post('/addworker',addworkers)

module.exports = router