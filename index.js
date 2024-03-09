const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const router_list = require('./router')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    limits: {
        fieldSize: 1000000*30
    }
}))
app.use(router_list)
app.use('/images',express.static('images'))

const MONGO_URI = 'mongodb://127.0.0.1:27017/todoapp' 
const PORT = 4000

const start = async () =>{
    try {
          await mongoose.connect(MONGO_URI)
          app.listen(PORT,()=>{
            console.log(`Server ${PORT} ishga tushdi`);
          })
    }catch (error){
        console.log(error);
    }
}

start()