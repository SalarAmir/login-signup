const User = require('../models/user')
const jwt= require('jsonwebtoken');

const test =(req,res)=>{
    res.json('test is working')
} 
//register endpoint
const registerUser = async(req,res)=>{
    try {
        const{name,email,password}= req.body;
        //check if name entered
        if(!name){
            return res.json({
                error:'name is required'
            })
        };
        if(!password || password.length<6){
            return res.json({
                error: 'Pass required and should be longer than 6 chars'
            })
        }
        const exist = await User.findOne({email});
        if (exist){
            return res.json({
                error:'email taken already'
            })
        }

        const user = await User.create({
            name,email,password
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}
//Login Endpoint

const loginUser=async (req,res)=>{
    try{
        const{email,password}=req.body;
        //check if user exists
        const user= await User.findOne({email});
        if(!user){
            return res.json({
                error:'no user found'
            })
        }
        // check is password matches
        const match = await User.findOne({password});
        if(!match){
            return res.json({
                error:'incorrect password'
            })
        }
        if(match){
            jwt.sign({
                email:user.email,
                id:user._id,
                name:user.name
            }, 
            process.env.JWT_SECRET,
             {}, 
            (err,token)=>{
                if(err) {
                    console.log(err);
                    return res.json({ error: 'Error signing the token' });
                }
                res.cookie('token',token).json({ message: 'passwords match', user });
            })
        }
    }catch(error){
        console.log(error)
    }
}

const getProfile=(req,res)=>{
    const {token} = req.cookie
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
}



module.exports={
    test,
    registerUser,
    loginUser,
    getProfile
}