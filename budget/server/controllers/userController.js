const UserModel = require("../models/Users");

const registerUser = (req, res) => {
    const newUser = new UserModel(req.body);
    newUser.save()
    .then(user=> res.json(user))
    .catch(error => {
        console.error(error);
        res.status(500).json({error:"Internal Server Error"})
    })
}

const loginUser = (req, res) => {
    const {username, password} = req.body;
    UserModel.findOne({username: username})
    .then(user => {
        if (user){
            if(user.password === password){
                res.json("Login Successful")
            }
            else{
                res.json("The password is incorrect")
            }
        }

        else{
            res.json("User does not exist, Register first.")
        }
    })
}

module.exports = {registerUser, loginUser};