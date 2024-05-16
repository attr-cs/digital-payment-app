const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {JWT_SECRET} = require('../config')
const jwt = require('jsonwebtoken');
const {User,Account} = require('../db')
const {userZod,updateInfo} = require('../types');
const userMiddleware = require('../middlewares/user');

router.use(express.json())

router.post('/signup',async (req,res)=>{
    const data = req.body;
    const {success} = userZod.safeParse(data);
    if(success)
    {

        const isExist =  await User.findOne({
            username:data.username
        })
        if(!isExist)
        {
            const newUser = await User.create({
                username:data.username,
                firstname:data.firstname,
                lastname:data.lastname,
                password:data.password
            })
            const userId = newUser._id
            const jwtSign = jwt.sign({userId},JWT_SECRET);
            const random = Math.floor(Math.random()*100000);
            await Account.create({
                userId:newUser._id,
                balance:random
            })

            return res.status(200).json({msg:"User created successfully!",token:jwtSign})
        }
        else{
            return res.status(403).json({"msg":"User already exist!"});
        }
    }
    else{
        return res.status(400).json({msg:"Wrong input format!"})
    }
})


router.post('/signin',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({username:username,password:password});
    if(!user)
    {
        return res.status(400).json("User not exist!");
    }
    const userId = user._id;
    const token = jwt.sign({userId},JWT_SECRET);
    res.status(200).json({token});
})


router.post('/transfer',userMiddleware,async (req,res)=>{
    
    const session = await mongoose.startSession();
    
    session.startTransaction();
    
    const {amount, to} = req.body;
    const account = await Account.findOne({userId:req.userId});
    
    
    if(!account || account.balance < amount || req.userId == to)
    {
        await session.abortTransaction();
        return res.status(412).json({"msg":"Insufficient Balance or transferring to same account!"});
    }
    
    const toAccount = await Account.findOne({userId:to});
    
    if(!toAccount)
    {
        await session.abortTransaction();
        return res.status(450).json({"msg":"Invalid Account"});
    }
    
    await Account.updateOne({userId:req.userId},{ '$inc':{balance: -amount} });
    await Account.updateOne({userId:to},{ '$inc':{balance: amount} });

    await session.commitTransaction();
    res.status(200).json({msg:"Transfer successfull!"});
});

router.post('/update',userMiddleware,async(req,res)=>{
    const data = req.body;
    const {success} = updateInfo.safeParse(data);
    if(!success)
    {
        return res.status(400).json({"msg":"input format not correct!"});
    }
    const user = await User.updateOne({
        _id:req.userId
    },data)
    res.status(200).json({done:"done!"})
})

router.get('/bulk',async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstname: {
                '$regex': filter
            }
        },{
            lastname: { 
                '$regex': filter
            }
        }]
    })

    res.status(200).json({
        user: users.map(user=>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;