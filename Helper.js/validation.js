const bcrypt = require('bcrypt')

const emailExpression = (email) => {

    let regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    return regex.test(email)

}

const passwordExpression = (password) => {
    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regex.test(password)
}

const hashPassword = async (password) => {
    let saltRound = 10
    let passwords = await bcrypt.hash(password,saltRound)
    return passwords
}

module.exports = {
    emailExpression,
    passwordExpression,
    hashPassword
}