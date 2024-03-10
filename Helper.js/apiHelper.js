const jwtToken = require('jsonwebtoken')
const CircularJSON = require('circular-json');

const apiResponse = (req,res,status,message,code,data=null) => {
    //need to dyanamic the data property (BUG)
    return res.json({
        status: status,
        statusCode: code,
        message: message,
        data: data
    })
}

const accessToken = (req,res,email) => {
    let secretKey = '96ed464c791f63bef28a172ee893113472dbb8e5c93879289cf34c4d3221fa8937cd4081136b6343d7679a92fd7a55397b88c8683cb53662b82a5d03108e6606'
    const accessToken = jwtToken.sign(CircularJSON.stringify(email), secretKey);
    console.log(accessToken)
}

module.exports = {
    apiResponse,
    accessToken
}