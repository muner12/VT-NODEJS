const express = require('express')
const os=require('os')
const dbConnection=require('./config/dbConnection');
const route=require('./routes/index');
const errorMiddleare=require('./middlewares/errorMiddleware')

//experss server
const app = express()
app.use(express.json());
console.log(process.pid)
dbConnection();
app.use('/api',route);
const port = process.env.PORT || 3001;

console.log(os.availableParallelism())


app.use(errorMiddleare)



app.listen(port, () => console.log(`Server is Running on: http://localhost:${port}`))