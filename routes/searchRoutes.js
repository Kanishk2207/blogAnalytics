const _ = require("lodash");
const dotenv = require("dotenv");
const router = require("express").Router()
const { blogDataFetcher } = require("../modules/blogData");
const { blogSearchQuery } = require("../modules/blogSearch");

//cache mechanism implementation
const cachedBlogSearchQuery = _.memoize(blogSearchQuery, (query) => query, 600000)

//cache invalidation is not implemented because there is no post or update method used. database will not get updated in this case



//middleware
router.get("/blog-search", async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: "no query found, provide a query" })
    };

    try {

        const apiURL = process.env.Blog_URL;
        const apiPass = process.env.URL_Pass;

        const blogData = await blogDataFetcher(apiURL, apiPass);

        const selectedBlogs = cachedBlogSearchQuery(blogData, query);
        if (!selectedBlogs.length) {
            res.json("no blog found, please try different query")
        }
        else {
            res.status(200).json(selectedBlogs)

        }

    } catch (err) {
        res.status(400).json('Error fetching blog data: ' + err.message)
    }



})

module.exports = router;