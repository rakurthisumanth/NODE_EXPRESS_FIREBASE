const { admin, db } = require("../../utils/admin")
const Utils = require("./Utils")


class Model{
    constructor(user){
        this.actionPerfermer=user
    }

    async _create_todo(inputs){
        const userRef=db.collection('TODOS').doc()
        return userRef.set({
            ...inputs,
            id:inputs.id,
            isExist:true,
            markedDone:false,
            author:this.actionPerfermer.uid
        })
    }


    async _update_todo(inputs,id){
    return Utils
    ._check_user_authorization(this.actionPerfermer.uid,id)
    .then(()=>{
        const todoRef=db.doc(`TODOS/${id}`)
        return todoRef.set({
            ...inputs
        },{merge:true})

    })
    .catch((err)=>{
        throw err
    })
    }


    async _delete_todo(id){
        return Utils._check_user_authorization(this.actionPerfermer.uid,id)
        .then(()=>{
            const userRef=db.doc(`TODOS/${id}`)
            return userRef.set({
                isExist:false
            },{merge:true})
        })

    }

    async _get_todo(id){

        return Utils._check_user_authorization(this.actionPerfermer.uid,id)
        .then((data)=>{
        return data
        })
        .catch((err)=>{
            throw err

        })

    }

    async _get_all_todos(id){
        return db.collection('TODOS').where("author","==",this.actionPerfermer.uid).where("isExist","==",true).get().then((snap)=>{
            if(snap.size <1) throw new Error("")
            return snap.docs[0].data()

        })
        .catch((err)=>{
            throw err

        })

    }


}
module.exports=Model