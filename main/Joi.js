const Joi=require('joi');

const schema=Joi.object({
    name:Joi.string().required(),
    age:Joi.number().integer().min(1).max(100).required(),
});

let payload={

    name:"muner",
    age:100,
    amount:200
}

let {value,error}=schema.validate(payload);

if(error){
    console.log(error.message)
}else{
    console.log(value)
}