const express = require('express');
require('dotenv').config();
const { connection } = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) =>{
    res.status(200).json({msg:'This is home route of Expense Claim Mangement'});
});

app.listen(process.env.PORT, async() =>{
    try {
        await connection;
        console.log('You connected to the DB');
        console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
});