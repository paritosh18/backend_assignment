const  User = require('../../models/User')

module.exports = {
    
    findByEmail : async(email) => {
       return await User.findOne({email:email})
    },

    create : async (user) => {
        return await User.create(user)
    }
}