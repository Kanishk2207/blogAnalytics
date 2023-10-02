const _ = require("lodash");
const { blogSearchQuery } = require("../modules/blogSearch")

const calculateAnalytics = (blogData) => {
    //fetching all blogs
    const totalBlogs = blogData.blogs.length;

    //preforming analytics
    const blogWithLongestTitle = _.maxBy(blogData.blogs, 'title.length');
    const query = 'privacy'
    const privaceBlogCount = blogSearchQuery(blogData, query).length;
    const uniqueBlogTitles = _.uniqBy(blogData.blogs, 'title').map((blog) => blog.title);

    return {
        totalBlogs: totalBlogs,
        longestBlogTitle: blogWithLongestTitle.title,
        privacyBlogCount: privaceBlogCount,
        uniqueBlogTitles: uniqueBlogTitles,
    };
};

module.exports = { calculateAnalytics };