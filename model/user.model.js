const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : String,
    email : String,
    role: {
        type: String,
        enum:['employee', 'manager', 'finance'],
        default: 'employee'
    }
});

const UserModel = mongoose.model('user', userSchema);

module.exports ={
    UserModel
};