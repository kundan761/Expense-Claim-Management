const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : String,
    email : String,
    pass:String,
    role: {
        type: String,
        enum:['employee', 'manager', 'finance'],
        default: 'employee',
    }
},{
    versionKey: false,
});

const UserModel = mongoose.model('user', userSchema);

module.exports ={
    UserModel
};