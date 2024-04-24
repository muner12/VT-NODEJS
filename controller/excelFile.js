const xlsx=require('xlsx');



const ExcelFile=require('../model/excelFile');
const { x } = require('tar');
const { json } = require('body-parser');
const excelFileController=async(req,res,next)=>{

 let data;
   
    try {
        const excelFile=xlsx.readFile('data/data.xlsx');
        const sheetName=excelFile.SheetNames[0];
        
        const workSheet=excelFile.Sheets[sheetName];
        
      data=xlsx.utils.sheet_to_json(workSheet);
    } catch(error) {
        res.status(400).json({
            STATUS:'FAIL',
            ERROR_CODE:"FILE_ERROR",
            ERROR_DESCRPTION:'FILE NOT FOUND'
        })
    }

    res.json(data)

}



const insertExcelFileData=async(req,res,next)=>{
    let data;
    //read excel file data
    try {
        const excelFile=xlsx.readFile('data/data.xlsx');
        const sheetName=excelFile.SheetNames[0];
        
        const workSheet=excelFile.Sheets[sheetName];
        
      data=xlsx.utils.sheet_to_json(workSheet);
    } catch (error) {
        res.status(400).json({
            STATUS:'FAIL',
            ERROR_CODE:"FILE_ERROR",
            ERROR_DESCRPTION:error,
            ERROR_FILTER:"",
            DB_DATA:""
        })
    }

    //insert excel file data in database
    let saveData = [];

// Define a function to handle the asynchronous operations
const processData = async (element) => {
    try {
        let newData = new ExcelFile(element);
        let foundData = await ExcelFile.findOne({ email: newData.email });

        if (!foundData) {
            let response = await newData.save();
            saveData.push(response);
        }
    } catch (error) {
        return res.status(400).json({
            STATUS: 'FAILED',
            ERROR_CODE: 'DB_ERROR',
            ERROR_DESCRPTION: error.message, // Use error.message to get the error message
            ERROR_FILTER: '',
            DB_DATA: '',
        });
    }
};

// Use Promise.all() to execute all asynchronous operations and wait for their completion
try {
    await Promise.all(data.map(processData));
} catch (error) {
    return res.status(400).json({
        STATUS: 'FAILED',
        ERROR_CODE: 'DB_ERROR',
        ERROR_DESCRPTION: error.message, // Use error.message to get the error message
        ERROR_FILTER: '',
        DB_DATA: '',
    });
}

   
    res.status(200).json({
        STATUS:'SUCCESS',
        ERROR_CODE:"",
        ERROR_DESCRPTION:"",
        ERROR_FILTER:"",
        DB_DATA:saveData
    })

}





const updateExcelFileData=async(req,res,next)=>{
    let reqData=req.body
    const excelToJson=()=>{
        
        let ws=xlsx.readFile('data/data.xlsx');
        let jsonData = xlsx.utils.sheet_to_json(ws.Sheets[ws.SheetNames[0]]);
        return jsonData;
    }
    let jsondata=excelToJson()
    let found=jsondata.find(element=>element.email==req.body.email);
    if(!found){
        return  res.status(404).json({
            STATUS:'FAIL',
            ERROR_CODE:"UPDATE_FILE_ERROR",
            ERROR_DESCRPTION:"RECORD NOT FOUND IN FILE"
        })
    }
    let updateList=jsondata.filter(element=>element.email!=req.body.email);
     
    let update;

    if(req.body.name){
        update={...found,name:req.body.name}
    }

    if(req.body.phone){
        update={...found,phone:req.body.phone}
    }
    

    let newUpdateList=[...updateList,update].sort((a,b)=>a.id-b.id);
    const ws=xlsx.utils.json_to_sheet(newUpdateList);
    try {
        const wb=xlsx.utils.book_new();

        xlsx.utils.book_append_sheet(wb,ws,'Sheet1');
   
     await   xlsx.writeFile(wb,'data/data.xlsx');
    } catch (error) {
        let desc=error.code=='EBUSY'?"FILE ALREADY OPENED":""
      return  res.status(400).json({
            STATUS:'FAIL',
            ERROR_CODE:error.code,
            ERROR_DESCRPTION:desc
        })
    }
   

let response

    try {


         
        response = await ExcelFile.findOneAndUpdate({ email: reqData.email }, reqData, { new: true });
        if(!response){
            return  res.status(404).json({
                STATUS:'FAIL',
                ERROR_CODE:"UPDATE_FILE_ERROR",
                ERROR_DESCRPTION:"RECORD NOT FOUND IN DATABASE"
            });
        }


    } catch (error) {
        return  res.status(400).json({
            STATUS:'FAIL',
            ERROR_CODE:"UPDATE_FILE_ERROR",
            ERROR_DESCRPTION:error
        })
    }


res.status(201).json({
    STATUS:'SUCCESS',
    ERROR_CODE:"",
    ERROR_DESCRPTION:"",
    ERROR_FILTER:"",
    DB_DATA:response
})
}










const deleteExcelFileData=async(req,res,next)=>{

    let ws=xlsx.readFile('data/data.xlsx');
    let jsonData = xlsx.utils.sheet_to_json(ws.Sheets[ws.SheetNames[0]]);
    let found=jsonData.find(element=>element.email==req.body.email);
    if(!found){
        return  res.status(404).json({
            STATUS:'FAIL',
            ERROR_CODE:"DELETE_FILE_ERROR",
            ERROR_DESCRPTION:"RECORD NOT FOUND IN FILE"
        })
    }
    let newData=jsonData.filter(element=>element.email!=req.body.email);


    try {
        let ws=xlsx.utils.json_to_sheet(newData);
        let wb=xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb,ws,'Sheet1');
       await xlsx.writeFile(wb,'data/data.xlsx');
    } catch (error) {

        let desc=error.code=='EBUSY'?"FILE ALREADY OPENED":""
      return  res.status(400).json({
            STATUS:'FAIL',
            ERROR_CODE:error.code,
            ERROR_DESCRPTION:"File Error"+error
        })
        
    }


    try {
        

         
        response = await ExcelFile.findOneAndDelete({ email: req.body.email });
        if(!response){
            return  res.status(404).json({
                STATUS:'FAIL',
                ERROR_CODE:"DB_ERROR",
                ERROR_DESCRPTION:"RECORD NOT FOUND IN DATABASE"
            });
        }
      return res.status(200).json({
        STATUS:'SUCCESS',
        ERROR_CODE:"",
        ERROR_DESCRPTION:"",
        ERROR_FILTER:"",
        DB_DATA:response
      })
    } catch (error) {
        return  res.status(400).json({
            STATUS:'FAIL',
            ERROR_CODE:"DB_ERROR",
            ERROR_DESCRPTION:error
        })
    }



}



module.exports={
    excelFileController,
    insertExcelFileData,
    updateExcelFileData,
    deleteExcelFileData
}