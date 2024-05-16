const {JWT_SECRET}  = require('../config');
const jwt = require('jsonwebtoken');


const userMiddleware = (req,res,next)=>{
    const rawToken = req.headers.authorization;
    if(!rawToken || !rawToken.startsWith('Bearer '))
    {
        return res.status(403).json({});
    }
    const token = rawToken.split(" ")[1];
    
    try{
        const tokenValid = jwt.verify(token,JWT_SECRET);
        req.userId = tokenValid.userId;
        next();
    }
    catch(err)
    {
        return res.status(403).json({msg:"Issue while authorising!"});
    }
    
}

module.exports = userMiddleware;