const { db } = require("../../utils/admin")


class Utils{
   
    static async _check_user_authorization(uid,docId){
        return db
        .collection('TODOS')
        .where("id","==",uid)
        .where("author","==",docId)
        .get().then((snap)=>{
            if(snap.size <1 ) throw new Error("not Exist")
            return snap.docs[0].data()
        })
        .catch((err)=>{
           throw err
        })

    }



}

module.exports=Utils