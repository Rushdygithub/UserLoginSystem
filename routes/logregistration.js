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
const {authonticationMiddleware,jsonwebtokenGenarate,verifyToken, test} = require('../customMiddleware/middleware')
// const {jsonwebtokenGenarate} = require('../customMiddleware/middleware')


app.use(bodyParser.json())
// app.use(authonticationMiddleware)

//database 
con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'userregistrationdb'
});

router.post('/registration', (req,res)=> {
    
    let {id,user,email,password,conform} = req.body   
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
    if(!conform)
    {
        return apiResponse(req,res,false,'Unsuccess',401,'User conform password is required')
    } 
    if(password !== conform)
    {
        return apiResponse(req,res,false,'Unsuccess',401,'Your password and conform password dismatch, try again')
    }

    userRegistration(req,res)

})

router.post('/login', authonticationMiddleware, (req,res)=> {

    let {email,password} = req.body
    
    if(!email)
    {
        return apiResponse(req,res,false,'Unsuccess',401,'User email is required')
    }
    if(!password)
    {
        return apiResponse(req,res,false,'Unsuccess',401,'User password is required')
    }

    // jsonwebtokenGenarate(req,res,email)
    // verifyToken(req,res,email)
    // jsonwebtokenGenarate(req,res,email)
    // verifyToken()
    login(req,res)

})

//This is the test route - (you can test something)
router.get('/token', (req,res)=> {
    let email = 'rushdy56@gmail.com'
    jsonwebtokenGenarate(req,res,email)
    verifyToken(req,res)
    // test()

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

