const express = require('express')
const router = express.Router()

const accountController = require('../controllers/AccountManager')
const check = require('../controllers/login')
router.get('/', accountController.getAllStudent )
router.post('/:token', check.verifyAdmin, check.phanquyen, accountController.createAccount, ), 
router.put('/:token/:id', accountController.updateAccount)
router.delete('/:id', accountController.deleteAccount)
module.exports = router