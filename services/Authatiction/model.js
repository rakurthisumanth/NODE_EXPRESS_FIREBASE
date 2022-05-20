const  {db,admin} =require('../../utils/admin')
const UTILS = require('./Utils')


class model{
    constructor(user){
        this.actionPerformer=user
    }

  async _create_User(inputs){

    let userInfo={}
    return admin.auth().createUser({
        email:inputs.email,
        password:inputs.password
    }).then((user)=>{
        userInfo=user
        return admin.auth().setCustomUserClaims(user.uid,{role:"user"})
    }).then(()=>{
        const userRef= db.collection('USERS').doc(userInfo.uid)
        const inputData={}
        Object.entries(inputs).forEach(([key,value])=>{
            if (key!=="password") inputData[key]=value
        })
        return userRef.set({
            ...inputs,
            isExist:true,
            // createdAt:serverTimeStrap,
            role:"user",
            id:userInfo.uid
        })
    }).catch((err)=>{
        throw err
    })
  }

  async _update_user(inputs,uid){
      return UTILS._check_user_exist(uid)
      .then((user)=>{
           return db.doc(`USERS/${user.uid}`).updateUser(inputs)
       }).catch((err)=>{
           throw err
       })

  }


  async _get_user(uid){
    const  userInfo={}
    return UTILS._check_user_exist(uid)
    .then(()=>{
        userInfo={...userInfo,...data}
        return userInfo
    })
    .catch((err)=>{   
        throw err
    })
  }

  async _delete_user(uid){
     return UTILS._check_user_exist(uid)
     .then(()=>{    
        return admin.auth().updateUser(uid,{disabled:true})
     }).then(()=>{
         
       return  db.doc(`USERS/${uid}`).update({isExist:false})
     })
     .catch((err)=>{
         throw err

     })

  }


 async _enable_user(uid){
    return UTILS._check_user_delete(uid).then(()=>{
        return admin.auth().updateUser(uid,{disabled:false})
    }).then(()=>{
        return db.doc(`USERS/${uid}`).update({isExist:true})
    })
    .catch((err)=>{
        throw err
    })
 }
}



module.exports=model