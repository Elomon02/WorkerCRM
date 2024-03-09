
const Worker = require('../modules/worker')

const get_all_workers = async (req,res)=>{
    const {bet} = req.query
    const skip = (bet-1)*10
    const workers = await Worker.find().limit(10).skip(skip).populate(['department'])
    const count = await Worker.find().count()
    res.json({
        status: 'Barcha departments',
        page: `${bet}-sahifa`,
        sumdata: count,
        limit: 6,
        data: {
            workers
        }
    })
}

const add_worker = async(req,res)=>{
    let filepath
   if(req.files){
    let {photo} = req.files
    let uniquePreffix =  Date.now ()+'-'+Math.round(Math.random()*1e9)
    filepath = `images/${uniquePreffix}_${photo.name}`
    await photo.mv(filepath)
   }
   const newworker = new Worker({...req.body,createdAt:new Date(),photo:filepath})
   newworker.save()
   .then(result =>{
    res.status(201)
    .json({
        status:'Yangi xodim qo`shildi',
        data:{
            worker:result
        }
    })
   })
}
const update_worker = async (req,res)=> {
  if(req.body){
    let {photo} = req.files
    const {_id} = req.body
    const worker = await Worker.findById(_id).lean()
    let filepath
   if(req.files){
    let uniquePreffix =  Date.now ()+'-'+Math.round(Math.random()*1e9)
    filepath = `images/${uniquePreffix}_${photo.name}`
    worker.photo=filepath
}
    const up_worker = await Worker.findByIdAndUpdate(_id,{...worker,...req.body})
    res.json({
        status: 'Xodim yangilandi',
        data:{
           newworker: up_worker,
            worker:   req.body
        }
    })
  } 
}
const get_byid_worker = async(req,res)=>{
 if (req.params){
    const {id} = req.params
    const id_worker = await Worker.findOne({_id:id}).populate(['department'])
    res.json({
        status: `${id} dagi ma'lumot`,
        data :{
            id_worker
        }
    })
 }
}
const delete_worker = async (req,res)=>{
   if(req.params){
    const {id} = req.params 
    const delete_worker = await Worker.findByIdAndDelete(id)
    res.json({
        status: 'Bo`lim o`chirildi',
        data :{
            delete_worker
        }
    })
   } 
}


module.exports = {
    get_all_workers,
    add_worker,
    get_byid_worker,
    update_worker,
    delete_worker
}