const express = require('express');
const data=require('../data/data')
const router = express.Router();
const registerController=require('../controller/register');
const chatController=require('../controller/chatController');
const verifyJWT = require('../middleware/verifyJwt');
router.get('/chatData', (req, res) => {

res.status(200).json({data:data});

})

//authentication routes
router.post('/upload',registerController.upload.single('file'),(req,res)=>{
   
    res.status(200).json({data:req.file.filename});
});

router.post('/register',registerController.register);

router.post('/login',registerController.login);

//let protected routes

router.get('/',verifyJWT,registerController.allUser);
router.post('/accessChat',verifyJWT,chatController.accessChat);
router.post('/chats',verifyJWT,chatController.fetchChats);
router.post('/createGroup',verifyJWT,chatController.createGroup);
router.post('/renameGroup',verifyJWT,chatController.renameGroup);
module.exports = router