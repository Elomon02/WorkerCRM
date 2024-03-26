const {Router} = require('express')
const router = Router()
const {auth} = require('../middleware/auth')

const {get_all_tasks,add_task,get_byid_task,update_task,delete_task} = require('../controllers/todo')

router
     .route('/')
     .all(auth)
     .get(get_all_tasks)
     .post(add_task)
     .put(update_task)

router 
      .route('/:id')
      .all(auth)
      .get(get_byid_task)
      .delete(delete_task)

module.exports = router