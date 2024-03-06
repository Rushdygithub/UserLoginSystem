const apiResponse = (req,res,status,message,code,data=null) => {
    //need to dyanamic the data property (BUG)
    return res.status(code).json({
        status: status,
        message: message,
        data: data
    })

}

module.exports = {
    apiResponse
}