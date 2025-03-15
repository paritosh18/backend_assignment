const { AsyncHandler } = require("../../utils/handler/Async.handler");
const ApiError = require("../../utils/handler/ApiError.handler");
const ApiResponse = require("../../utils/handler/ApiResponse.handler");
const userService = require("../../services/user/user.service");
const { bcryptService } = require("../../services");
const tokenservice = require("../../services/token/tokenservice");


module.exports = {

    signup: AsyncHandler(async (req, res) => {
        const {
            name,
            email,
            password,
        } = req.body;

        if (!name || !email || !password) {
            throw new ApiError(400, 'All fields are required');
        }
        const existingUser = await userService.findByEmail(email);
        if (existingUser) {
            throw new ApiError(400, 'User already exists');
        }
        const password_hash = await bcryptService.hash(password);
        const user = {
            name,
            email,
            password: password_hash,
        }

       const newUser =  await userService.create(user);
       
        const tokens = await tokenservice.generateAuthTokens(newUser);
    
        
        return res.status(201).json(new ApiResponse(201,{tokens}, 'User registered successfully'));

    })

}