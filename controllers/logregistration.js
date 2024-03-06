// const {con} = require('../routes/logregistration')
const mysql = require('mysql')
const {apiResponse} = require('../Helper.js/apiHelper')
const {hashPassword} = require('../Helper.js/validation')

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
  
        let mysql  = 'SELECT * FROM userregistrationTable WHERE user=?'
        let mysql1 = 'SELECT * FROM userregistrationTable WHERE email=?'
        let mysql2 = 'INSERT INTO  userregistrationTable (id,user,email,password) VALUES (?,?,?,?)'

           
            con.query(mysql,[user], async (error,result)=> {
                if(error) throw error
                // return apiResponse(req,res,true,'Success',200,result)
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
     
}


module.exports = {
    userRegistration,
    login
}