const express = require('express')
const dotenv = require('dotenv').config();
const xlsx=require('xlsx')
const app = express()
const port = process.env.PORT || 3001;


const excelFile=xlsx.readFile('data/data.xlsx');
const sheetName=excelFile.SheetNames[0];

const workSheet=excelFile.Sheets[sheetName];

const data=xlsx.utils.sheet_to_json(workSheet);

console.log(data)





app.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))