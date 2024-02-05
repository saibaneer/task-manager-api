const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task must have a title!"],
        trim: true,
        maxlength: [20, "Name cannot be more than 20 characters"]
    },
    isCompleted: {
        type: Boolean,
        // required: true,
        default: false
    }
})



module.exports = mongoose.model('Task', taskSchema);