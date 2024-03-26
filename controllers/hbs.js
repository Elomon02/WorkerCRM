const Department = require('../modules/departments')
const mongoose = require('mongoose')
const Worker = require('../modules/worker')

const home = async (req,res)=>{
   res.render('page/home')
}

const about = async (req,res)=>{
    res.render('page/about')
}

const departments = async (req,res)=>{
    const depart = await Department.find().sort({_id: -1}).lean()
    res.render('page/department',{
        depart
    })
}

 const department = async (req,res)=>{
    if(req.params){
        const _id = req.params.id
        if(mongoose.Types.ObjectId.isValid(_id)){
         const onedepart = await Department.findById(_id).lean()
         res.render('page/depart',{
            onedepart
         })
 }else{
    res.status(403).json({massage: 'id ni xato kiritingiz'})
}
}else{
    res.send('Ma`lumot topilmadi')
   }
}

  const newdepartment= async (req,res) =>{
      res.render('page/newdepartment')
    }
    
    const adddepartmnet= async  (req,res)=>{
      console.log(req.body);
     const newdepart = new Department({...req.body})
     newdepart.save()
     .then(()=>{
        res.redirect('/depart')
     })
   .catch((e)=>{
    console.log(e);
   })
  }

  const workers = async(req,res)=>{
     const worker = await Worker.find().sort({_id: -1}).populate(['department','user']).lean()
     console.log(worker.photo);
     res.render('page/worker',{
        worker
     })
  }
  const newworker= async (req,res) =>{
   res.render('page/newworker')
 }
  const addworkers = async(req,res)=>{
   let filepath
   if(req.files){
    let {photo} = req.files
    let uniquePreffix =  Date.now ()+'-'+Math.round(Math.random()*1e9)
    filepath = `images/${uniquePreffix}_${photo.name}`
    await photo.mv(filepath)
   }
    const newworker = new Worker({...req.body,photo:filepath})
    console.log(req.files);
    newworker.save()
    .then(()=>{
      res.redirect('/workers')
   })
 .catch((e)=>{
  console.log(e);
 })
  }
  const person = async (req,res)=>{
   if (req.params) {
      const _id = req.params.id;
      if(mongoose.Types.ObjectId.isValid(_id)){
         const oneperson =  await Worker.findById(_id).populate(['department','user']).lean()
         res.render('page/person',{
            oneperson
         })
      }
      else{
         res.status(403).json({massage: 'id ni xato kiritingiz'})
     }
  } else {
      res.send('Ma`lumot topilmadi');
  }
  }  
module.exports =  {
    home,
    about,
    departments,
    department,
    newdepartment,
    adddepartmnet,
    workers,
    addworkers,
    person,
    newworker
}