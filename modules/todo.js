const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    task_title: {
        type: String,
        required: true  
    },
    text: {
        type: String,
        required: true 
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },
    manager: {
        type: String,
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    
        photo: [String],
        createdAt:  {
            type: Date,
            default: Date.now
        },
        status: {
            type: Boolean,
            default: true
        },
    startdate: {
        type: Date,
        default: Date.now
    }
});

module.exports = model ('Task', todoSchema);
