const express=require('express')
const app = express();
const mongoose =require('mongoose')
const cors = require('cors')

app.get('/',(req,res)=>{res.send("hello i'm srii...")})

app.use(cors())
app.use(express.json())

const Db = async()=>{
    try {
        await mongoose.connect('mongodb+srv://srimanvithapavuluri:Ammu2003@cluster0.bdbfw9e.mongodb.net/?retryWrites=true&w=majority').then(
            ()=>{
                console.log("Connected to DataBase...")
            }
        )
    } catch (error) {
        console.log(error)
    }
}

Db();

app.listen(5000,()=>{console.log("Server is running on port 5000...")})