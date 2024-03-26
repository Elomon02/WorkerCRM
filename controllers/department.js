const Department = require('../modules/departments')
const {decoded} = require('../util/decoded')
const mongoose = require('mongoose')



const get_all_department =  async (req,res)=>{
    const {page} = req.query
    const skip = (page-1)*6
    console.log(req.query);
    const user_id = decoded(req,res)
    const departments = await Department.find({user: user_id}).limit(6).skip(skip).populate(['user'])
    const count = await Department.find({user: user_id}).countDocuments()
    res.json({
        status: 'Barcha departments',
        page: `${page}-sahifa`,
        sumdata: count,
        limit: 6,
        data: {
            departments
        }
    })
    }


const get_one_department = async(req,res)=>{
   if(req.params){
    const {id} = req.params
    if(mongoose.Types.ObjectId.isValid(id)){
        const department = await Department.findOne({_id: id})
        res.json({
            status : `${id}--bo'lim ma'lumoti`,
            data:{
                department
            }
        })
    }else{
        res.status(403).json({massage: 'id ni xato kiritingiz'})
    }
   }else{
    res.send('Ma`lumot topilmadi')
   }
}
const add_new_department = async (req,res)=>{
    if(req.body){
        const user = decoded(req)
    const department_db = new Department({...req.body,user})
    await department_db.save()
    res.json({
        status: 'Yangi bo`lim qo`shildi',
        data : {
            department_db
        }
    })
    }
}
const delete_department = async(req,res)=>{
    if(req.params){
        const {id} = req.params
    const department =  await Department.findByIdAndDelete(id)
    res.json({
        status: 'Bo`lim o`chirildi',
        data :{
                department
        }

    })
    }
}
const update_department = async (req,res)=>{
   if(req.body){
    const {_id}= req.body
    const department = await Department.findById(_id).lean()
    const Updatedepart = await Department.findByIdAndUpdate(_id,{...department,...req.body})
    res.json({
        status: 'Bo`lim yangilandi',
        data:{
            newdepartment: req.body,
            createdDate: new Date(),
            status: 'Eski bo`lim',
            department:Updatedepart
        }
    })
   }
}
module.exports ={
    get_all_department,
    get_one_department,
    add_new_department,
    delete_department,
    update_department
}