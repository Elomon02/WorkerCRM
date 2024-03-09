const {Schema,model} = require('mongoose')

const worker = new Schema({
    name:{
        type: String,
        required: true  
    },
    lname:{
        type: String,
        require: true
    },
    phone:{
        type:String
    },
    age:{
        type:Number,
        required: true,
        validate:{
            validator: (v)=>{
                return v >=18
            },massage: props =>`${props.value} yoshli xodim kerakmas`        }
    },
    department:{
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    photo: String,
    createdAt:  Date,
    status: {
        type: Boolean,
        default: true
    }
})
module.exports = model('Worker',worker)