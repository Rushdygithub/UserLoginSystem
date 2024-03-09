const apiResponse = (req,res,status,message,code,data=null) => {
    //need to dyanamic the data property (BUG)
    return res.json({
        status: status,
        statusCode: code,
        message: message,
        data: data
    })
}

module.exports = {
    apiResponse
}