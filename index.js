const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const blogRoutes = require("./routes/blogRoutes")
const searchRoutes = require("./routes/searchRoutes")

dotenv.config();
const app = express();

//middleware
app.use(express.json());


app.use("/api", blogRoutes);
app.use("/api", searchRoutes);

//error handeling
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    try {
        console.log(`server is running on port ${port}`)
    } catch (err) {
        console.log(err)
    }
});