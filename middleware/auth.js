const jwt=require('jsonwebtoken')

const SECRET ='pencraft_secret_key'

module.exports=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
  
    if(!token){
        return res.status(401).json({message:'no token,unauthorized'})
    }

    try{
        const decoded=jwt.verify(token,SECRET)
        req.user=decoded
        next()
    }catch{
        res.status(401).json({message:'Invaild token'})
    }
}