const Product=require("../modal/productModal");

const getAllProducts=async(req,res)=>{
    try {
        
        const product= await Product.findAll();
        res.writeHead(200,{"Content-Type": "application/json"});
        res.end(JSON.stringify(product));

    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    getAllProducts
}