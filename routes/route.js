const experss=require('express');


class Routes{

constructor(){
    this.Router=experss.Router();
    this.POST();
    this.GET();
}



POST(){
    this.Router.post('/register',(req,res)=>{

    })

}

GET(){
    this.Router.get('/test',(req,res)=>{
        res.json({
            message:"test route"
        })
    })
}



}
module.exports=Routes