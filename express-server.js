const express=require('express');
require('dotenv').config();
const path=require('path');
const app=express();

const PORT=process.env.PORT

//middleware

const looger=(req,res,next)=>{
    console.log("before request");
    console.log("logged")
    next();
}
app.use(looger);
//routes 
app.use(express.json())
app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname,'view','form.html'))
});

app.get('/old',(req,res)=>{

    res.status(302).redirect('/')
});


app.get('/middleware',(req,res,next)=>{
    console.log("route")
    res.send('middlware');
    next();
    
})
const one=(req,res,next)=> {

    console.log("one");
    next();
};
const two = (req, res, next)=>{
    console.log('two');
    next()
}
const three= (req, res) =>{
 res.send("finished");
}

app.get('/chain',[one,two,three]);



app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
});