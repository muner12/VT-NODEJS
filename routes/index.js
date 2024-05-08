const express = require('express');
const data=require('../data/data')
const router = express.Router();
const registerController=require('../controller/register')
router.get('/chatData', (req, res) => {

res.status(200).json({data:data});

})


router.post('/upload',registerController.upload.single('file'),(req,res)=>{
   
    res.status(200).json({data:req.file.filename});
});

router.post('/user',registerController.register)


module.exports = router