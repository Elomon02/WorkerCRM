const {Schema,model} = require('mongoose')

const department = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: 'Noname'
    },
    phone: {
        type: String,
        default: 998901234567
        
    },
     age:{
        type: Number,
        default: 20
     },
      education:{
        type: String,
        default: 'Oliy ma`lumotli'
      }
})
module.exports = model('Department',department)