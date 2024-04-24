const express=require('express')
const excelFile=require('../controller/excelFile')
const router=express.Router()

router.post('/getAll',excelFile.excelFileController);
router.post('/insertExcelFileData',excelFile.insertExcelFileData);

router.post('/updateExcelFileData',excelFile.updateExcelFileData);
router.post('/deleteExcelFileData',excelFile.deleteExcelFileData);

module.exports=router