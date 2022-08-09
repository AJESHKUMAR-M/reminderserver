const express=require('express')
const jwt = require('jsonwebtoken')
const cors=require('cors')
const dataService=require('./service/dataservice')
const app = express()
app.use(cors({
    origin:"http://localhost:4200"
}))
app.use(express.json())

//  deleteAcc api
// bankapp.delete('/deleteAcc/:userid',jwtMiddleware,(req, res) =>{
//     //delete solving
// dataService.deleteAcc(req.params.acno)

// .then(result=>{
//   res.status(result.statusCode).json(result)

// })
// })




//token verify
const jwtMiddleware = (req,res,next)=>{
  
    //to fetch token
    try{
        token = req.headers['reminder-token']
        const data = jwt.verify(token,'secretkey123')
        req.currentUserid = data.currentUserid
        next()
    }
    catch{
        res.status(401).json({
            status:false,
            statusCode:401,
            message:'Please login'
        })
    }
}
//delete event
app.post('/deleteEvent',jwtMiddleware,(req, res)=>{
    dataService.deleteEvent(req,req.k).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// //  deleteAcc api
// app.delete('/deleteAcc/:currentUserid',jwtMiddleware,(req, res) =>{
//     //delete solving
// dataService.deleteAcc(req.params.currentUserid)

// .then(result=>{
//   res.status(result.statusCode).json(result)

// })
// })

app.post('/register',(req, res)=>{
    dataService.register(req.body.username,req.body.userid,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/login',(req, res)=>{
    dataService.login(req.body.userid,req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/addEvent',jwtMiddleware,(req,res)=>{
    dataService.addEvent(req,req.body.date,req.body.event).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/getEvent',jwtMiddleware,(req,res)=>{
    dataService.getEvent(req,req.currentUserid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})







app.listen(3000,()=>{
    console.log("server started at 3000");
})
