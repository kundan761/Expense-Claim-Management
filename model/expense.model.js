const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    title : String,
    desc : String,
    status: {
        type: String,
        enum:['approve', 'reject'],
        default: 'reject'
    },
    username: String,
    userID : String
});

const expenseModel = mongoose.model('expense', expenseSchema);

module.exports = {
    expenseModel
};