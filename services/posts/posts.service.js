const Post = require("../../models/post");
const Posts = require("../../models/post");

module.exports = {
    createPost: async (data) => {
        return await Posts.create(data)
    },


     getPost : async (query) => {

        const { searchText, startDate, endDate, tags, limit = 10, offset = 0 } = query;

        let filter = {};

        if (searchText) {
            filter.$or = [
                { postName: { $regex: searchText, $options: "i" } },
                { description: { $regex: searchText, $options: "i" } }
            ];
        }


        if (startDate || endDate) {
            filter.uploadTime = {};
            if (startDate) filter.uploadTime.$gte = new Date(startDate);
            if (endDate) filter.uploadTime.$lte = new Date(endDate);
        }

        // Tags filter
        if (tags && tags.length) {
            filter.tags = { $in: tags };
        }

        // Fetch posts with pagination
        const posts = await Post.find(filter)
            .skip(Number(offset))
            .limit(Number(limit));

        const total = await Post.countDocuments(filter);

        return { posts, total };
    }

}