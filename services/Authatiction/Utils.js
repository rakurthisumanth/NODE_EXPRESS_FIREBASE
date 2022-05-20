const {db,admin}=require('../../utils/admin')

class UTILS{
    static async _check_user_exist(uid){
        return db
        .collection("USERS")
        .where("uid","==",uid)
        .where("isExist","==",true)
        .get()
        .then((snap)=>{
            if(snap.size <1) throw new Error("User-not-exist")
            return snap.doc[0].data()
        })
        .catch((err)=>{
            throw err
        })

    }

    static async _check_user_delete(uid){
        return db
        .collection("USERS")
        .where("uid","==",uid)
        .where("isExist","==",false)
        .get()
        .then((snap)=>{
            if(snap.size <1) throw new Error("user-Already-exist")
            return snap.docs[0].data()
        })
        .catch((err)=>{
            throw err
        })
        
    }



}
module.exports=UTILS