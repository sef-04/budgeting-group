const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")

const app = express();

app.use (express.json());
app.use(cors());

//database
mongoose.connect("mongodb://localhost:27017/users");


app.use(userRoutes);


// app.post("/register", (req,res) =>{
//     UserModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(error => res.json(error))
// })


app.listen (8000, ()=>{
    console.log('Server is running at http://localhost:8000');

});