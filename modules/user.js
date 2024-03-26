const {Schema,model} = require('mongoose')

const user = new Schema ({
    login:{
        type: String,
        required: [true, 'Login yozilishi shart'],
        unique: [true, 'Bunday foydalanuvchi mavjud']
    },
     password:{
        type: String,
        required: [true,'Parol yozilishi shart']
     },
      createdAt: Date,
      status:{
        type: Boolean,
        default: true
      }
})
 module.exports = model('User', user)