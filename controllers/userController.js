const User = require('../models/user');

const user_register = async (req, res) => {
    user = await User.findOne({username: req.body.username});
    if(user)
    {
        res.status(401).json({
            message: "User already exists",
            user: User,
        })
    }
    else
    {
        initAmount = req.body.amount;
        await User.create({
            username : req.body.username,
            balance: initAmount
        })

        res.redirect('/');
    }
}

const user_register_form = (req, res) => {
    res.render('user/register', {title : "Register user"});
}

module.exports = {
    user_register,
    user_register_form,
}