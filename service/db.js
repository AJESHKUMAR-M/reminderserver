const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/reminder',{
    useNewUrlParser:true
})
const User=mongoose.model('User',
{
    username:String,
    userid:String,
    password:Number,
    event:[]
})
module.exports={
    User
}