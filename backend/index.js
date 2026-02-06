import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express()

app.use(express.json)
dotenv.config()

const PORT = process.env.PORT || 8000

const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL).then(()=>{
    console.log("DataBase connected successfully")
    app.listen(PORT,()=>{
        console.log(`server is running on hhtp://localhost${PORT}`)
    })
}).catch((error)=>{
console.log(error.message);
})













