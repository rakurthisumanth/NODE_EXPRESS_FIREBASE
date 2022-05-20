const { admin } = require("./utils/admin")

const Closedend=(req,res,next)=>{

if(req.headers.authorization){
    const token=req.headers.authorization.split(" ").pop()
    return admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken)=>{
        console.log(decodedToken)
        return next() 
    })
    .catch((err)=>{
        console.log(err)
        return res.status(404).json({message:"Invalied Token"})
    })
}
else{

    return res.status(404).json({message:"Un autharization"})
}

}
module.exports={Closedend}