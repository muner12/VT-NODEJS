const express=require('express');
const offerController=require('../controllers/offerController');
const JoiValidation=require('../controllers/JoiValidation')
const router=express.Router();

router.get('/offer',offerController);
router.post('/validation',JoiValidation.validationResponse);

module.exports=router