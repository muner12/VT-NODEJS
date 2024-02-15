
const sucess=(pos)=>{
    console.log(pos);
}
const error=(error)=>{
    console.log(error);
}
const location=()=>{



    return global.navigator.geolocation.getCurrentPosition(sucess,error);
}

module.exports=location;