const _ = require("lodash");

const blogSearchQuery = (blogData, Query)=>{
    const searchedBlogs = _.filter(blogData.blogs, (blog) =>
        _.includes(_.toLower(blog.title), Query)
    )
    return searchedBlogs;
};

module.exports = { blogSearchQuery };