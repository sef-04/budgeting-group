const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")

const app = express();

app.use (express.json());
app.use(cors());

//database
mongoose.connect("mongodb+srv://NicoDatabase:3rdyear223@budgetingservicedatabas.akz8v.mongodb.net/Budget");


app.use(userRoutes);



app.listen (8000, ()=>{
    console.log('Server is running at http://localhost:8000');
});