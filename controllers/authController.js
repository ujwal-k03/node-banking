const User = require("../models/user")

const user_register = async (req, res) => {
    console.log("hi");
    const { username, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
    }

    try {
        await User.create( {username, password} )
            .then(user => res.status(200).json({message: "User successfully created", user})
        )
    }
    catch (err) {
        res.status(401).json({
          message: "User not successful created",
          error: err.message,
        })
    }
}

const user_register_form = (req, res) => {
    res.render('auth/register')
}

const user_login = async (req, res) => {
    const {username, password} = req.body;

}
module.exports = {
    user_register,
    user_register_form,
}