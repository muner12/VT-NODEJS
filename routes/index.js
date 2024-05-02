const express=require('express')

const controller=require('../controller/controller');


const router=express.Router();

router.post('/get_orders_by_dates',controller.getStatisticByDate);
router.post('/qaurter_statistic',controller.getMonthsOrder);
router.get('/save',controller.saveData);


module.exports=router