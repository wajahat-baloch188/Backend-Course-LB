// app create 
const express = require("express")
const app = express()

require("dotenv").config();
// port
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json())
const fileUpload = require("express-fileupload")
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

// db connection
const db = require("./config/database.js")
db.connectDB()

// cloud connection
const cloudinary = require("./config/cloudinary.js")
cloudinary.cloudinaryConnect()

// api route mount
const router = require("./routes/FileUpload.route.js");
app.use("/api/v1/upload", router)

// activate server
app.listen(PORT, () =>{
    console.log(`App is listening on Port ${PORT}`)
})