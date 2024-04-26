const experss = require('express')
const controller=require('../controller/controller')
const router = experss.Router()

router.post('/RegisterAuthor',controller.addAuther);
router.post('/AddPost',controller.addPost);
router.post('/AddComment',controller.addComment);
router.post('/AddLike',controller.addLike);
router.post('/AddShare',controller.addShare);
router.get('/Populate',controller.populate);



module.exports=router