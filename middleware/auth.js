const jwt = require('jsonwebtoken')
require('dotenv').config()
 const auth = async (req, res, next )=>{
     try{
        const token = req.headers.authorization.split(' ').at(1)
        req.user = jwt.verify(token,process.env.secretkey)
        next()
     } catch(e) {
        res.status(401).json({massage: 'Tizimga kirishda xatolik berdi'})
     }
 }
 module.exports ={
    auth
 }