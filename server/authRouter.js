const Router = require('express')
const router = new Router()

//Authorization
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration', [
    check('username', 'Имя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 6 и меньше 16').isLength({min:6, max:16}),
    ], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["ADMIN"]), controller.users)



//Storage
const storageController = require('./storageController')

router.get('/ingridients',roleMiddleware(["ADMIN"]), storageController.ingrigients)






module.exports = router