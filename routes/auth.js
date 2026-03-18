const express =require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User =require('../models/User')

const SECRET = 'pencraft_secret_key'


router.post('/register',async(req,res)=>{
    try{
        const{username,email,password}=req.body

        const exitingUser=await User.findOne({email})
        if(exitingUser){
            return res.status(400).json({ message: 'Email already registered' })
        }

        const hashed =await bcrypt.hash(password,10)

        const user=new User({username,email,password:hashed})
        await user.save()
        
        res.status(201).json({message:'Account created successfully!'})
    }
    catch(err){
          res.status(400).json({message:err.message})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body
        //Find user email
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        //Checking password
        const match=await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(401).json({message:'Wrong Password'})
        }
        //Create Token
        const token=jwt.sign(
            {id:user._id,username:user.username},
            SECRET,
            {expiresIn:'7d'}
        )
        //send Token and user info
        res.json({
            token,
            id:user._id,
            username:user.username,
        })
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports=router
