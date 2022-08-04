const userModel = require('../model/userModel')
const bcrypt = require('bcrypt');
const validator = require('../middleware/validator')
const jwt = require('jsonwebtoken')

const register = async function (req, res) {
    try {
        const data = req.body
        const { name, email, password } = data
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Deatils" })
        }
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, massage: "please enter Full-Name" })
        }

        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, massage: "please enter Email" })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, massage: "please enter correct Email" })
        }
        const DBEmail = await userModel.findOne({ email: email })
        if (DBEmail) {
            return res.status(400).send({ status: false, massage: "Email alrady Exist use different emailId" })
        }

        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, massage: "please enter Password" })
        }
        if (password.length < 8 || password.length > 15) {
            return res.status(400).send({ status: false, massage: "please length should be 8 to 15 password" })
        }
        const hash = bcrypt.hashSync(password, 6);
        data.password = hash

        const createUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User created successfully", data: createUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const login = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Deatils" })
        }

        const { email, password } = data
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, massage: "please enter Email" })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, massage: "please enter correct Email" })
        }

        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, massage: "please enter Password" })
        }

        const userr = await userModel.findOne({ email: email })
        if (!userr) {
            return res.status(401).send({ status: false, message: 'email is wrong' })
        }
        const decrpted = bcrypt.compareSync(password, userr.password);
        if (decrpted == true) {
            const token = await jwt.sign({
                UserId: userr._id,
            }, 'privatekey')

            // res.setHeader('api-key', token)
            const user = await userModel.findOne({ email: email }).select({ email: 1, name: 1, _id: 1 })
            return res.cookie('api-key', token).status(200).send({ status: true, message: "Successful Login", token: token, data: user })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const logoutUser = async function (req, res) {
    try {

        res.clearCookie('api-key').status(200).send({ status: true, Message: "Successful logout" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const getUser = async function (req, res) {
    try {
        let userid = req.params.userId
        if (!validator.isValidObjectId(userid)) {
            return res.status(400).send({ status: false, message: "Please provide valid userid" })
        }
        if (req.decodedToken.UserId == userid) {
            let u_details = await userModel.findOne({ _id: userid })
            if (!u_details) {
                return res.status(404).send({ status: false, message: "user not found" })
            }
            return res.status(200).send({ status: true, Message: "successful", data: u_details })
        } else {
            return res.status(403).send({ status: false, message: "authorization denied" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// with authrorization
// const updateUser = async function (req, res) {
// try{
//     let data = req.body
//     let filter = {}
//     let userid = req.params.userId
//         if (!validator.isValidObjectId(userid)) {
//             return res.status(400).send({ status: false, message: "Please provide valid userid" })
//         }
//     if (Object.keys(data).length === 0) {
//         return res.status(400).send({ status: false, message: "Please enter upadate Deatils" })
//     }

//     const { name, password } = data
//     if (validator.isValid(name)) {
//         filter['name']=name
//     }

    
//     if (validator.isValid(password)) {
//         if (password.length < 8 || password.length > 15) {
//             return res.status(400).send({ status: false, massage: "please length should be 8 to 15 password" })
//         }
//             const hash = bcrypt.hashSync(password, 6);
//             filter['password']=hash
//     }

//     if(req.decodedToken.UserId == userid){
//         let upadateUs = await userModel.findOneAndUpdate({_id:userid},{$set:{filter}},{new:true})
//         return res.status(200).send({status:true,message:"successful",data:upadateUs})
//     }
//     else {
//         return res.status(403).send({ status: false, message: "authorization denied" })
//     }
     
// } catch (error) {
//         return res.status(500).send({ status: false, message: error.message })
//     }
// }

const updateUser = async function (req, res) {
    try{
        let data = req.body
        let filter = {}
       
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter upadate Deatils" })
        }
    
        const { name, password } = data
        if (validator.isValid(name)) {
            filter['name']=name
        }
        
        
        
        if (validator.isValid(password)) {
            if (password.length < 8 || password.length > 15) {
                return res.status(400).send({ status: false, massage: "please length should be 8 to 15 password" })
            }
                const hash = bcrypt.hashSync(password, 6);
                filter['password']=hash
        }
    
             let upadateUs = await userModel.findOneAndUpdate({},{$set:{filter}},{new:true})
            return res.status(200).send({status:true,message:"successful",data:upadateUs})
        
         
    } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
    



module.exports.register = register
module.exports.login = login
module.exports.logoutUser = logoutUser
module.exports.getUser = getUser
module.exports.updateUser = updateUser