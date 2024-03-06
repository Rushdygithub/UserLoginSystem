const express = require('express')
const app     = express()
const router  = express.Router()
const {userRegistration,login} = require('../controllers/logregistration')
const dotenv   =require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const {apiResponse} = require('../Helper.js/apiHelper')
const {emailExpression,passwordExpression,hashPassword} = require('../Helper.js/validation')
const mysql = require('mysql')


app.use(bodyParser.json())

//database 
con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'userregistrationdb'
});

router.post('/registration', (req,res)=> {
    
    let {id,user,email,password} = req.body   
    //input validation (to ensure the security)
    if(!id)
    {
        return apiResponse(req,res,false,'Unsuccess',401,'User id is required')
    }
    if(!user)
    {
        return apiResponse(req,res,false,'Unsuccess',401,'User name is required')
    } 
    if(!email)
    {
        return apiResponse(req,res,false,'Unsuccess',401,'User email is required')
    }
    if(!password)
    {
        return apiResponse(req,res,false,'Unsuccess',401,'User password is required')
    }
    if(!emailExpression(email))
    {
        return apiResponse(req,res,false,'Unsuccess',401,'User email is invalid')
    }
    if(!passwordExpression(password))
    {
        return apiResponse(req,res,false,'Unsuccess',401,'Password is not strong')
    }
    
    userRegistration(req,res)

})

router.post('/login', (req,res)=> {
    login(req,res)
})

//server connection callback fucntion
app.listen(8000, (error)=> {
    if (error) throw error
    console.log(`Server is runing on PORT 8000`)
})

//database connection callback fucntion
con.connect(function(err) {
    if (err) throw err;
    // console.log("Connected!");
});


app.use('/user', router)

module.exports = con