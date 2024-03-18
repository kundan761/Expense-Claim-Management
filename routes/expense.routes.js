const express = require('express');
const { access } = require('../middlewares/access.middleware');
const { auth } = require('../middlewares/auth.middleware');
const { expenseModel } = require('../model/expense.model');
const expenseRouter = express.Router();


expenseRouter.get('/', auth, access('employee','finance', 'manager'), async(req, res)=>{
    const { status } =req.query;
    const {userID} = req.body;
    const {page} = req.query;

    console.log(status);
    try {
        if(status === 'approve'){
            const limit = 10;
            const skipValue = page*limit - limit;
            const limitValue = page*limit;
            res.status(200).json({record: await expenseModel.find({status: 'approve'}).skip(skipValue).limit(limitValue)});
        }else if(status == 'reject'){
            const limit = 10;
            const skipValue = page*limit - limit;
            const limitValue = page*limit;
            res.status(200).json({record: await expenseModel.find({status: 'reject'}).skip(skipValue).limit(limitValue)});
        }else{
            if(userID && page){
                const limit = 10;
                const skipValue = page*limit - limit;
                const limitValue = page*limit;
                const expense = await expenseModel.find({userID}).skip(skipValue).limit(limitValue);
                res.status(200).json({expense});

            }
        }
    } catch (error) {
        res.status(400).json({error});
    }
});

// add new expenses

expenseRouter.post('/', auth, access('finance','manager'), async(req, res)=>{
    const { title, desc, status, username, userID } = req.body;  
    try {
        const expense = new expenseModel({
            title,
            desc,
            status,
            username,
            userID
        });
        await expense.save();
        res.status(200).json({msg: 'New expense is added'});
    } catch (error) {
        res.status(400).json({error});
    }
});

//update expense

expenseRouter.patch('/:expenseID', auth, access('finance'), async(req, res)=>{
    const { expenseID } = req.params;
    const payload = req.body;
    const userID = req.body.userID;
    try {
        const expense = await expenseModel.findOne({_id: expenseID});
        if(userID == expense.userID){
            await expenseModel.findByIdAndUpdate({expenseID, payload});
            res.status(200).json({msg: 'Expense is update'});
        }else{
            res.status(200).json({msg:'you are not allowed to do this operation'});
        }
    } catch (error) {
        res.status(400).json({error});
    }
});