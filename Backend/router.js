const express = require('express')
const router = express.Router()
const userController = require('./controller/userController')
const auth = require('./middleware/auth')

router.post('/registration', userController.register)


router.post('/login', userController.login)

router.get('/logout', userController.logoutUser)

router.get('/getuser/:userId',auth.authentication, userController.getUser)

router.put('/update',userController.updateUser)

    module.exports = router