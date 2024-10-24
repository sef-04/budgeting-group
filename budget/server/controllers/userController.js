

const UserModel = require("../models/Users");

const registerUser = (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password ) {
        return res.json( "Username and password are required." );
        
    }

    if (password !== confirmPassword) {
        return res.json( "Passwords do not match!" );
      }


    UserModel.findOne({ username: username })
        .then(existingUser => {
            if (existingUser) {
                return res.json( "Username already in use." );
            }

           
            const newUser = new UserModel({ username, password });
            
            newUser.save()
                .then(user => {
                    res.json(user); 
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: "Internal Server Error" });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password ) {
        return res.json( "Username and password are required." );
        
    }

    UserModel.findOne({ username: username })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Login Successful")
                }
                else {
                    res.json("The password is incorrect")
                }
            }

            else {
                res.json("User does not exist, Register first.")
            }
        })
}

module.exports = { registerUser, loginUser };