const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const router_list = require('./router')
const cors = require('cors')
require('dotenv').config()
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    }))
app.use(express.json())
app.use(cors())
app.engine('hbs', engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(fileUpload({
    limits: {
        fieldSize: 1000000*30
    }
}))
app.use(router_list)
app.use('/workers/images', express.static('images'))

const MONGO_URI = 'mongodb://127.0.0.1:27017/todoapp' 
const PORT = 4000

const start = async () =>{
    try {
          await mongoose.connect(process.env.MONGO_URI)
          app.listen(process.env.PORT,()=>{
            console.log(`Server ${process.env.PORT} ishga tushdi`);
          })
    }catch (error){
        console.log(error);
    }
}

start()