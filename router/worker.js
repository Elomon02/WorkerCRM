const {Router} = require('express')
const router = Router()

const {get_all_workers,add_worker,get_byid_worker,update_worker,delete_worker} = require('../controllers/worker')

router
     .route('/')
     .get(get_all_workers)
     .post(add_worker)
     .put(update_worker)

router 
      .route('/:id')
      .get(get_byid_worker)
      .delete(delete_worker)

module.exports = router