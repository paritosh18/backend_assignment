const ApiError = require("../../utils/handler/ApiError.handler");
const { AsyncHandler } = require("../../utils/handler/Async.handler");
const postService = require("../../services/posts/posts.service");
const ApiResponse = require("../../utils/handler/ApiResponse.handler");

module.exports = {

    createPosts: AsyncHandler(async(req,res)=>{
        const {postName , description ,uploadTime ,tags , imageUrl} = req.body

        const userId = req.user.userId;
        if (!userId) {
            throw new ApiError(401, 'User not found.');
        }

        if(!postName || !description) {
            throw new ApiError(404 , "postName or description  or uploadTime is Not Found")
        }

        

        const data = { postName, description, uploadTime, tags, imageUrl, userId };

        const createPost =  await postService.createPost(data);

        res
        .status(200)
        .json(new ApiResponse(200, {createPost}, 'Post created succesfully.'));
    }),

    
   getAllPosts: AsyncHandler(async(req,res)=>{
     

    const result = await postService.getPost(req.query)

    res.status(200).json(new ApiResponse(200, {result}, 'Post Get Successfully'))

   })
}