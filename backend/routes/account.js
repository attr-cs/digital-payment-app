const express = require('express');
const userMiddleware = require('../middlewares/user');
const { Account } = require('../db');
const router = express.Router();

router.get('/balance',userMiddleware,async (req,res)=>{
    const user = await Account.findOne({userId:req.userId});
    if(!user)
    {
        return res.json({msg:"User not found"});
    }
    const balance = user.balance;
    res.status(200).json({balance:balance});
})

module.exports = router;