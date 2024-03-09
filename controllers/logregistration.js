const mysql = require('mysql')
const {apiResponse} = require('../Helper.js/apiHelper')
const {hashPassword,compareHashPassword} = require('../Helper.js/validation')
const bcrypt = require('bcrypt')
const jwtToken = require('jsonwebtoken')
const CircularJSON = require('circular-json');


//need to optimized this program
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'userregistrationdb'
});

const userRegistration = (req,res) => {

    try {

        let {id,user,email,password} = req.body
  
        //all database queries
        let mysql  = 'SELECT * FROM userregistrationTable WHERE user=?'
        let mysql1 = 'SELECT * FROM userregistrationTable WHERE email=?'
        let mysql2 = 'INSERT INTO  userregistrationTable (id,user,email,password) VALUES (?,?,?,?)'

        
            con.query(mysql,[user], async (error,result)=> {

                if(error) throw error
                if (result.length > 0)
                {
                    return apiResponse(req,res,false,'Unsuccess',401,'Your name is already in, try again')

                } else {
                    
                    con.query(mysql1,[email], (error,result)=> {
                    if (error) throw error
                        if (result.length > 0)
                        {
                            return apiResponse(req,res,false,'Unsuccess',401,'your email address is already in, try again')     
                        }
                    })
                            let passwords = await hashPassword(password)
                  
                            con.query(mysql2,[id,user,email,passwords], (error)=> {
                                if (error) throw error
                                return apiResponse(req,res,true,'Success',200,'User Registration is success')
                            })
                }   
            })
    } catch (error) {
        return apiResponse(req,res,false,'Unsuccess',500,error)
    }
}

const login = (req,res) => {
    
    try {

        let {email,password} = req.body
        // let trimPassword = password.trim()
        //all database queries
        let sql = 'SELECT * FROM  userregistrationTable WHERE email=?'
        let sql1= 'SELECT password FROM userregistrationTable WHERE email = ?';

        con.query(sql,email, (error,result)=> {
            if (error) throw error
            if(result.length > 0)
            {
                con.query(sql1,email, async (error,result)=> {
                    if (error) throw error
                        if(result.length > 0)
                        {
                            let hashedPasswordFromDB = result[0].password;
                            //Note:: compare password issue  (length of the password) - good job
                            let compare = await compareHashPassword(password,hashedPasswordFromDB)
                            //compare varible returns true boolean value
                            if (!compare)
                            {
                                // return apiResponse(req,res,true,'Success',200,'User loging is success')
                                return apiResponse(req,res,false,'Unsuccess',401,'Password is dismatch, try again')
                            } else {

                            let secretKey = '96ed464c791f63bef28a172ee893113472dbb8e5c93879289cf34c4d3221fa8937cd4081136b6343d7679a92fd7a55397b88c8683cb53662b82a5d03108e6606'
                            const accessToken = jwtToken.sign(CircularJSON.stringify(email), secretKey);
                            console.log(accessToken)
                            // let se = '96ed464c791f63bef28'
                            const user = jwtToken.verify(accessToken, secretKey);
                            console.log(user)
                            if (user)
                            {
                                console.log('Token is verifaied')
                            } else {
                                console.log('Not verified')
                            }

                            
                                return apiResponse(req,res,true,'register success',200,`Token: ${accessToken}`)
                            }
                        } 
                })

            } else {
                return apiResponse(req,res,false,'Unsuccess',401,'Your user credintial is wrong, try again')
            }
        })

    } catch (error) {
        return apiResponse(req,res,false,'Unsuccess',500,error) 
    }
}

module.exports = {
    userRegistration,
    login
}