const axios = require("axios")


//function for fetching blogs data from URL
const blogDataFetcher = async (URLS, Pass) => {
    try {
        const response = await axios.get(URLS, {
            headers: {
                'x-hasura-admin-secret': Pass,
            },
        });

        return response.data
    }
    catch (err) {
        throw new Error('Error fetching blog data: ' + err.message);
    }
}

module.exports = { blogDataFetcher };