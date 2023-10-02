const router = require("express").Router()
const dotenv = require("dotenv")
const _ = require("lodash");
const { blogDataFetcher } = require("../modules/blogData")
const { calculateAnalytics } = require("../modules/analytics")

dotenv.config();

//cache mechanism implementation
const cachedCalculateAnalytics = _.memoize(calculateAnalytics, ()=> 'cacheKey', 600000)

//cache invalidation is not implemented because there is no post or update method used. database will not get updated in this case


//middleware
router.get("/blog-stats", async (req, res) => {
    try {
        const apiURL = process.env.Blog_URL;
        const apiPass = process.env.URL_Pass;

        const blogData = await blogDataFetcher(apiURL, apiPass);

        const analyticsData = cachedCalculateAnalytics(blogData);


        res.status(200).json(analyticsData);
    } catch (err) {
        res.json('Error fetching blog data: ' + err.message)
    }
})

module.exports = router;


