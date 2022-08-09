 const db=require('./db')
const jwt =require('jsonwebtoken')
 
 //register
 const register=(username,userid,password)=>{
    return db.User.findOne({
      userid
    }).then(user=>{
      if(user){
        return {
          status:false,
          message: "already existed...please log in",
          statusCode:401
        }
      }
      else{ 
        const newUser = new db.User({
           username,
           userid,
          password,
         event:[]
          
        })
        newUser.save()
        return {
          status:true,
          message:"register success",
          statusCode:200
        }
        
      }
    })
    }

    //login
const login=(userid,password)=>{
   
  return db.User.findOne({
    userid,
   password
  }).then(user=>{

    if(user){
      currentUser=user.username
      currentUserid=userid
    
    token = jwt.sign({
      //store acno inside token
      currentUserid:userid
    },'secretkey123')
         return {
          status:true,
          message: "login success",
          statusCode:200,
          currentUser,
          currentUserid,
          token
    
         }
    }
    else{
      return {
        status:false,
        message: "userid or password incorrect!!",
        statusCode:401
      }
    }
  })
}
//addEvent
const addEvent = (req,date,event)=>{
  let currentUserid=req.currentUserid
  console.log(currentUserid);
  return db.User.findOne({
      userid:currentUserid
  }).then(user=>{
      if(user){
          console.log(user);
          user.event.push({
              date:date,
              event:event
          })
          user.save()
          return{
          status: true,
          message: "New event is added",
          statusCode:200
          }
      }
      else{
          return{
              status: false,
              message: "Invalid credentials",
              statusCode:401
          }
      }
  })
}
//getEvent
const getEvent = (req,currentUserid)=>{
  return db.User.findOne({
      userid:currentUserid
  }).then(user=>{
      if(user){
          return{
              status: true,
              statusCode:200,
              event:user.event
          }
      }
      else{
          return{
              status: false,
              message: "User doesnot exist",
              statusCode:401
          }
      }
  })
}
//delete event
const deleteEvent = (req,k)=>{
  let currentUserid =req.currentUserid
  return db.User.findOne({
    userid:currentUserid
  }).then(user=>{
    if(user){
      user.event.splice(k,1)
    }
    user.save()
    return{
      status:true,
      message:"event is deleted",
      statusCode:200
    }
  })
}

//delete
const deleteAcc=(userid)=>{
  return   db.User.deleteOne({userid}).then(user=>{
       if(!user){
         return{
           status:false,
           message: "operation failed",
           statusCode:401
         }
       }
       return{
         status:true,
         statusCode:200,
         message:'successfully deleted'
       }
     })

   }


        module.exports ={ 
          register,
          login,
          addEvent,
          getEvent,
          deleteAcc,
          deleteEvent
        }
