const express=require('express');
const offerController=require('../controllers/offerController');
const router=express.Router();

router.get('/offer',offerController);


module.exports=router