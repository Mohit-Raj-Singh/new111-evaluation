const jwt=require("jsonwebtoken");
require("dotenv").config();

const authentication=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,process.env.key);
        if(decoded){
            const userID=decoded.userID;
            req.body.userID=userID;
            next();
        }
        else{
            res.send({"msg":"please login first"});
        }
    }
    else{
        res.send({"msg":"please login first"});
    }
}


module.exports={authentication};