
const Auther=require('../model/auther')
const Post=require('../model/post')
const Like=require('../model/like')
const Share=require('../model/share')
const Comment=require('../model/comment')




const  addAuther=async(req,res,next)=>{

    try {
        
        fond=await Auther.findOne({email:req.body.email});
        if(fond){
          return  res.status(422).json({
                STATUS:'Failed',
                ERROR:"ALREADY_REGISTERED"
            })
        }
        
    } catch (error) {
        console.log(error);
        
    }
    try {
        
    const auther=new Auther({
        name:req.body.name,
        email:req.body.email
    });

    const result=await auther.save();
    res.status(200).json(result);

    } catch (error) {
        console.log(error);
    }




}



const addComment=async(req,res,next)=>{
    try {
        
        const comment=new Comment({
            content:req.body.content,
            post:req.body.post,
            auther:req.body.auther
        
        });

       
        let result=await comment.save();
        let post=await Post.findById(req.body.post);
        post.comments.push(result._id);
        post.save();


        res.status(200).json(result);



    } catch (error) {
        console.log(error);
    }
}






const addPost=async(req,res,next)=>{

    try {
        
        const post=new Post({
            content:req.body.content,
            auther:req.body.auther
        });

        let result=await post.save();

        


        res.status(200).json(result);


    } catch (error) {
        console.log(error);
    }
}


const addLike=async(req,res,next)=>{
    try {

        const findLikes=await Like.findOne({post:req.body.post,auther:req.body.auther});
        let likeCount;
        if(findLikes==null){
            likeCount=1
        }else if(findLikes.auther==req.body.auther){
            return res.status(200).json({message:'Already Liked'})
        }else{
            likeCount=findLikes.likes+1
        }
        

        
        
        


        const like=new Like({
            likes:likeCount,
            post:req.body.post,
            auther:req.body.auther
        });
        let result=await like.save();
        let post=await Post.findById(req.body.post);
        post.likes.push(result._id);
        post.save();
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
}

const addShare=async(req,res,next)=>{
    
    try {
        
        const shareCount=await Share.findOne({post:req.body.post,auther:req.body.auther});
        let count;
        if(shareCount==null){
            count=1
        }else{
            count=shareCount.shares+1
        }

        const share=new Share({
            shares:count,
            post:req.body.post,
            auther:req.body.auther
        })

        let result=await share.save();
        let post=await Post.findById(req.body.post);
        post.shares.push(result._id);
        post.save();
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
}


const populate=async(req,res,next)=>{
    try {
        
      // Find author and populate comments, shares, and likes
      let data= await Post.find().populate('auther')
      .populate('comments')
      .populate('likes')
      .populate('shares');
      
    
res.status(200).json(data);


    } catch (error) {
        console.log(error)
    }

}

module.exports={
    addAuther,
    addPost,
    addLike,
    addComment,
    addShare,
    populate

}