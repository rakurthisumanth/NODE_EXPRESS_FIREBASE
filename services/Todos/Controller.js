const { Closedend } = require('../../endpoint')
const Model = require('./model')

const router=require('express').Router()

router.post('/createTodo',Closedend,(req,res)=>{
    const inputs=req.body
    const obj=new Model
    return obj
    ._create_todo(inputs)
    .then(()=>{
        return res.status(202).json({message:"create Todo Sucessfully"})
    })
    .catch(()=>{
        return res.status(404).json({message:"create Todo is Failure"})
  })

})

router.patch('/updateTodo',Closedend,(req,res)=>{
    const {id}=req.query
    const inputs=req.body
    const obj=new Model
    return obj
    ._update_todo(inputs,id)
    .then(()=>{
        return res.status(202).json({message:"update todo Sucessfully"})

    })
    .catch((err)=>{
        throw err

    })


})


router.delete('/deleteTodo',Closedend,(req,res)=>{
    const {id}=req.query
    const obj=new Model
    return obj
    ._delete_todo(id)
    .then(()=>{
        return res.status(201).json({message:'delete Todo Sucessfully'})
    }).catch((err)=>{
        throw err

    })

})


router.get('/user',Closedend,(req,res)=>{
    const {id}=req.query
    const obj=new Model
    return obj
    ._get_todo(id)
    .then((tododata)=>{
        return res.status(202).json({tododata})

    }).catch((err)=>{
        throw err

    })

})


module.exports=router