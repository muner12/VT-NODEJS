const express=require('express');

const authController=require('../controller/authController');
const userController=require('../controller/userController');
const router=express.Router();


router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/PostUser').post(userController.userController)
module.exports=router