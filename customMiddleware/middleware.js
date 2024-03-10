const { apiResponse } = require("../Helper.js/apiHelper")
const jwtToken = require('jsonwebtoken')
const dotenv   =require('dotenv')
dotenv.config()

// const crypto = require('crypto').randomBytes(64).toString('hex') //used to create random valid key

const authonticationMiddleware = (req,res,next) => {

    let client = req.header('X-OAuth-Client-Name')
    let deviceName = req.header('X-OAuth-Client-Device')
    let version = req.header('X-OAuth-Client-Device-Version')
    let errMsg = ''

            if (!client)
            {
                errMsg = 'X-OAuth-Client-Name is required'
                return apiResponse(req,res,false,'Unsuccess',401,errMsg)    
            }
            else if (!deviceName)
            {
                errMsg = 'X-OAuth-Client-Device is required'
                return apiResponse(req,res,false,'Unsuccess',401,errMsg)    
            }
            else if (!version)
            {
                errMsg = 'X-OAuth-Client-Device-Version is required'
                return apiResponse(req,res,false,'Unsuccess',401,errMsg)    
            } 
            next()
}

// const jsonwebtokenGenarate = (req,res,userEmail) => {
//     try {

//          //playload
//         const user = {
//           email: userEmail
//         }

//         if(userEmail === '')
//         {
//             console.log('No email addded')
//             return apiResponse(req,res,false,'unsuccess',401,'No email added')  

//         } else {

//             let secretKey = '96ed464c791f63bef28a172ee893113472dbb8e5c93879289cf34c4d3221fa8937cd4081136b6343d7679a92fd7a55397b88c8683cb53662b82a5d03108e6606'
//             // let option   =  { expiresIn:3600 };
    
//             // console.log(Option)
//             //console.log(jwtToken.sign(CircularJSON.stringify(user), secretKey, { expiresIn: 60 * 60}))
//             //jsonstingify and circularjson strigify difference
//             const accessToken = jwtToken.sign(CircularJSON.stringify(user), secretKey);
//             // console.log(accessToken)
//             let obj = {
//                 token: accessToken,
//                 secretKeys: secretKey
//             }
//             // console.log(obj)
//             return accessToken
//             // return apiResponse(req,res,true,'Success',200,accessToken)  
//             // if(req.header('token') !== accessToken)  
//             // {
//             //     return apiResponse(req,res,false,'unsuccess',401,'anothorized')  
    
//             // } 
//             // next()
//             // return apiResponse(req,res,true,'Success',200,'Done')
//         }
//         // next()
       
//     } catch (error)
//     {
//         // let err = error
//         return apiResponse(req,res,false,'Unsuccess',500,error)    
//         // console.log(error.message)
//     }
// }

// const verifyToken = (req,res,email) => {
//     try {

//     // const authHeader = req.headers.authorization;
//     let secretKey = '96ed464c791f63bef28a172ee893113472dbb8e5c93879289cf34c4d3221fa8937cd4081136b6343d7679a92fd7a55397b88c8683cb53662b82a5d03108e6606'
//     // if(!authHeader)
//     // {
//         // console.log('Unauthorized!')
//     // }

        
//         // let token = jsonwebtokenGenarate()
//         // console.log(token)

//         // let token = 'eyJhbGciOiJIUzI1NiJ9.e30.dRVuioWuZzuHsqmhiyF5VvimcR2371XuaOwF6yqQu_0'
        
//         // let token = jsonwebtokenGenarate.obj.accessToken
//         const user = jwtToken.verify(token, secretKey);
//         // console.log(email = user)
//         // console.log(user)
//         if (user) 
//         {
//             console.log('Token is Verified')
//         } 
//         // next()
//         // next();
//       } catch (error) {
//         res.status(401).json({
//             status: 'fail',
//             message: 'Unauthorized!',
//             error: error.message
//           });
//       }
// }


const tokenVerified = (req,res,next) => {

    let auth = req.header('authorization')
    if(!auth)
    {
        return apiResponse(req,res,false,'Unsuccess',401,'unauthourized')    
    }
    try {
        let token
        token = auth
        let secretKey = '96ed464c791f63bef28a172ee893113472dbb8e5c93879289cf34c4d3221fa8937cd4081136b6343d7679a92fd7a55397b88c8683cb53662b82a5d03108e6606'
        let verified = jwtToken.verify(token,secretKey)
        let userEmail = req.user = verified
        console.log(userEmail)
        next()
    } catch (error)
    {
        return apiResponse(req,res,false,'Unsuccess',401,error.message)    
    }
    
}

module.exports = {
    authonticationMiddleware,
    tokenVerified 
}