const { AsyncHandler } = require("../../utils/handler/Async.handler");
const User = require("../../models/User");
const ApiError = require("../../utils/handler/ApiError.handler");
const { bcryptService } = require("../../services");
const tokenService = require("../../services/token/tokenservice");
const ApiResponse = require("../../utils/handler/ApiResponse.handler");
const userService = require("../../services/user/user.service");
   
module.exports = {

    login: AsyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const existingUser = await userService.findByEmail(email);

        if (!existingUser) {
            throw new ApiError(401, "User not found.");
        }

        const isPasswordCorrect = await bcryptService.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid credentials.");
        }
   
        const tokens = await tokenService.generateAuthTokens(existingUser);

        res
            .status(200)
            .json(new ApiResponse(200, { ...tokens }, 'Logged in succesfully.'));

    }),
}