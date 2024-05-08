const express = require('express');
const data=require('../data/data')
const router = express.Router();
const {upload}=require('../controller/register')
router.get('/chatData', (req, res) => {

res.status(200).json({data:data});

})


router.post('/upload',upload.single('file'),(req,res)=>{
   
    res.status(200).json({data:req.file.filename});
});


module.exports = router