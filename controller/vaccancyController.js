const Applicant=require('../model/applicant')
const Vaccancy=require('../model/vaccancy');
const ApplyForm=require('../model/submitForm');
const addApplicants=async(req,res,next)=>{

        try {
            
            let applicant= new Applicant(req.body);
            let result= await applicant.save();

            res.status(200).json({
                Status:'Success',
                Data:result
            })


        } catch (error) {
            res.status(500).json({
                Status:'Failed',
                ERROR:"TECHNICAL_ERROR",
                ERROR_DESC:error
            })
        }


}



const addVaccancy=async(req,res,next)=>{

    try {
        
        let vaccancy= new Vaccancy(req.body);
        let result= await vaccancy.save();

        res.status(200).json({
            Status:'Success',
            Data:result
        })


    } catch (error) {
        res.status(500).json({
            Status:'Failed',
            ERROR:"TECHNICAL_ERROR",
            ERROR_DESC:error
        })
    }


}


let submitApplication=async(req,res,next)=>{
    

    try {
    let user=await Applicant.findOne({email:req.body.email});
    let vaccancy=await Vaccancy.findOne({name:req.body.vaccancy});    
    let fond=await ApplyForm.findOne({vaccancy_id:vaccancy._id,user_id:user._id});
    if(fond){
        return res.status(200).json({
            Status:'Failed',
            ERROR:"ALREADY_APPLIED"
        })
    }
    

    const apply=new ApplyForm({
        vaccancy_id:vaccancy._id,
        user_id:user._id
    });

    let result=await apply.save();
    let data=await ApplyForm.findById(result._id).populate('vaccancy_id').populate('user_id');


        res.json({
            Status:'Success',
            Data:data
        }
        )

    } catch (error) {
        res.status(500).json({
            Status:'Failed',
            ERROR:"TECHNICAL_ERROR",
            ERROR_DESC:error
        }) 
    }

}


const findAllApplies=async(req,res,next)=>{
    

try {




const dbData=await ApplyForm.find().populate('vaccancy_id').populate('user_id');

res.status(200).json({
    Status:'Success',
    Data:dbData
})


    
} catch (error) {
    return res.status(500).json({
        Status:'Failed',
        ERROR:"TECHNICAL_ERROR",
        ERROR_DESC:error
    })
}

}


module.exports={
    addApplicants,
    addVaccancy,
    submitApplication,
    findAllApplies

}