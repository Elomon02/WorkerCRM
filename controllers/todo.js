
const Task = require('../modules/todo')
const {decoded} = require('../util/decoded')
const mongoose = require('mongoose')

const get_all_tasks = async (req,res)=>{
    const {bet} = req.query
    const skip = (bet-1)*10
    user_id = decoded(req,res)
    const tasks = await Task.find({user: user_id}).limit(10).skip(skip).populate(['department','worker','user'])
    const count = await Task.find({user: user_id}).countDocuments()
    res.json({
        status: 'Barcha todo lists',
        page: `${bet}-sahifa`,
        sumdata: count,
        limit: 10,
        data: {
            tasks
        }
    })
}

const add_task = async (req,res)=>{
    let filepath 
    if(req.files){
        const {photo} = req.files
        let uniquePreffix = Date.now()+'-'+Math.round(Math.random()*1e9)
        filepath = `images/${uniquePreffix}_${photo.name}`
        await req.files.photo.mv(filepath);
    }
    user = decoded(req,res)
    const task = await Task ({...req.body,user,createdAt:new Date(),photo:filepath})
    task.save()
     .then(result=>{
        res.status(200)
        .json({
            status: 'Yangi topshiriq qo`shildi',
            data :{
                task: result
            }
        })
     })
}
const get_byid_task= async (req,res)=>{
   if(req.params){
    const {id} = req.params
    if(mongoose.Types.ObjectId.isValid(id)){
        const onetask = await Task.findOne({_id:id}).populate(['department','worker','user'])
        res.json({
            status: `${id} dagi topshiriq listi`,
            data:{
                onetask
            }
        })
    }else{
        res.status(403).json({massage: 'id ni xato kiritingiz'})
    }
   }
}
const update_task= async (req,res)=>{
  if(req.body){
    const {_id} = req.body
    const task = await Task.findById(_id).lean()
    let filepath 
    if(req.files){
        const {photo} = req.files
        let uniquePreffix = Data.now()+'-'+Math.round(Math.random()*1e9)
        filepath = `images/${uniquePreffix}_${photo.name}`
        await photo.mv(filepath)
        worker.photo = filepath
    }
    const updatetask = await Task.findByIdAndUpdate(_id, { ...task, ...req.body })
    const uptask = await Task.findById(_id).lean()

    res.status(201).json({
        status: 'Topshiriq yangilandi',
        data:{
            uptask
        }
    })
  }
}
const delete_task = async (req,res)=>{
    if(req.params){
        const {id} = req.params
        const delete_task = await Task.findByIdAndDelete(id).lean()
        res.status(400).json({
            status: `${id} -- id dagi ma'lumot o'chirildi`,
            data:{
                oldtask: delete_task
            }
        })
    }
}

module.exports = {
    get_all_tasks,
    add_task,
    get_byid_task,
    update_task,
    delete_task
}