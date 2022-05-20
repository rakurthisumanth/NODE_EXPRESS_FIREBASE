const router=require('express').Router()
const model = require('./model')
const {Closedend}=require('../../endpoint')

router.post('/createUser',(req,res)=>{
    const inputs=req.body
    const obj=new model
    return obj
    ._create_User(inputs)
    .then(()=>{
        return res.status(201).json({message:"user Create Sucessfully"})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(505).json({message:"user  Failed To Craete"})
    })
})


router.patch('/updateUser',(req,res)=>{
    const {uid}=req.query
    const inputs=req.body
    const obj=new model()
  return obj
  ._update_user(inputs,uid)
  .then(()=>{
      return res.status(201).json({message:"user Update sucessfully"})

  })
  .catch((err)=>{
      console.log(err)
      return res.status(505).json({message:"user Update Fail"})
  })

})

router.get('/user',Closedend,(req,res)=>{
    const {uid}=req.query
    const obj=new model()
    return obj
    ._get_user(uid)
    .then(()=>{
        return res.status(202).json({message:"Get User Sucessfully"})
    })
    .catch((err)=>{
        return res.status(500).json({message:"get user Failure"})
    })

})

router.delete('/user',(req,res)=>{
    const {uid}=req.query
    const obj=new model
    return obj
    ._delete_user(uid)
    .then(()=>{
        return res.status(201).json({message:"user delete Sucessfully"})
    })
    .catch((err)=>{
        console.log(err)
        return res.status(505).json({message:"user delete failure"})

    })

})

router.put('/enableUser',(req,res)=>{
    const {uid}=req.query
    const obj=new model
    return obj
    ._enable_user(uid)
    .then(()=>{
        res.status(201).json({message:"User Enable Sucessfully"})
    })
})




module.exports=router