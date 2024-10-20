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

module.exports = {registerUser};