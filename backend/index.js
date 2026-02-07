
import express, { Router } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'
import router from "./routes/router.js"


const app = express()
app.set("json spaces",2);
app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/api', router)

const PORT = process.env.MONGO_DB_PORT|| 8000;
const PORT1= process.env.SERVER_PORT || 9000;
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL).then(()=>{
    console.log("DataBase connected successfully")
    app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT}`)
    })
}).catch((error)=>{
console.log(error.message);
})



app.listen(PORT1,()=>{
    console.log(`http://localhost:${PORT1}`);
})










