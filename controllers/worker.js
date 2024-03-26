
const Worker = require('../modules/worker')
const {decoded} = require('../util/decoded')
const mongoose = require('mongoose')

const get_all_workers = async (req,res)=>{
    const {bet} = req.query
    const skip = (bet-1)*10
    const user_id = decoded(req,res)
    const workers = await Worker.find({user: user_id}).limit(10).skip(skip).populate(['department','user'])
    const count = await Worker.find({user:user_id}).countDocuments()
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
   const user = decoded(req,res)
   const newworker = new Worker({...req.body,user,createdAt:new Date(),photo:filepath})
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
const update_worker = async (req, res) => {
      if (req.body) {
        const { _id } = req.body;
        let filepath;
        const worker = await Worker.findById(_id).lean();
  
        if (req.files) {
          const { photo } = req.files;
          const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          filepath = `images/${uniquePreffix}_${photo.name}`;
          await photo.mv(filepath);
          worker.photo = filepath;
          const updatedWorker = await Worker.findByIdAndUpdate(_id, { ...worker,...req.body });
  
        const up_worker = await Worker.findById(_id).lean();
  
        res.json({
          status: 'Xodim yangilandi',
          data: {
            newworker: up_worker
          }
        });
      }} else {
        res.status(400).json({ message: 'Iltimos, foydalanuvchi malumotlarini kiriting.' });
    
    }
  };
  
const get_byid_worker = async(req,res)=>{
 if (req.params){
    const {id} = req.params
    if(mongoose.Types.ObjectId.isValid(id)){
      const id_worker = await Worker.findOne({_id:id}).populate(['department','user'])
      res.json({
          status: `${id} dagi ma'lumot`,
          data :{
              id_worker
          }
      })
    }else{
      res.status(401).json({
        error: 'id xato kiritildi'
      })
    }
    
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