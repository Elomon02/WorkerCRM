const Department = require('../modules/departments')




const get_all_department =  async (req,res)=>{
    const {page} = req.query
    const skip = (page-1)*6
    console.log(req.query);
    const departments = await Department.find().limit(6).skip(skip)
    const count = await Department.find().count()
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
    const department = await Department.findOne({_id: id})
    res.json({
        status : `${id}--bo'lim ma'lumoti`,
        data:{
            department
        }
    })
   }else{
    res.send('Ma`lumot topilmadi')
   }
}
const add_new_department = async (req,res)=>{
    if(req.body){
    const department_db = new Department({...req.body})
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