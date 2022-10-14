const History = require('../models/history');
const User = require('../models/user');

const home = (req, res) => {
    res.render('transaction/home', {title: "Transaction Home"});
}

const history = async (req, res) => {
    username = req.body.username;
    let user = await User.findOne({ username:  req.body.username});
    if(!user)
    {
        res.status(401).json({
            message: "User doesn't exist"
        })
    }
    else
    {
        results = await History.find({username: username});
    
        res.render('transaction/history', {title: "Transaction History", results, user})
    }
}

const transactionform = (req, res) => {
    res.render('transaction/new', {title: "New Transaction"});
}

const transactionpost = async (req, res) => {
    let recipient = await User.findOne({ username:  req.body.recipient});
    let sender = await User.findOne({username : req.body.sender});
    let balance;

    if(!recipient || !sender)
    {
        res.status(401).json({
            message: "Sender or Recipient dont exist"
        })
    }
    else if(req.body.amount > sender.balance)
    {   
        balance = sender.balance;
        res.status(400).json({
            message: `Please enter amount less than ${balance}`,
        })
    }
    else
    {
        sender.balance -= req.body.amount;
        sender.save();
        History.create({
            username: sender.username,
            type: "Debit",
            amount: req.body.amount,
            user2name: recipient.username,
        })

        recipient.balance += req.body.amount;
        recipient.save();
        History.create({
            username: recipient.username,
            type: "Credit",
            amount: req.body.amount,
            user2name: sender.username,
        })

        res.redirect('/');
    }
}

const depositform = (req, res) => {
    res.render('transaction/deposit', {title: "Deposit"});
}

const depositpost = async (req, res) => {
    let user = await User.findOne({ username:  req.body.user});

    if(!user)
    {
        res.status(401).json({
            message: "User doesn't exist"
        })
    }
    else
    {
        user.balance += req.body.amount;
        user.save();

        History.create({
            username: user.username,
            type: "Deposit",
            amount: req.body.amount,
        })
        res.redirect('/');
    }
}

const withdrawform = (req, res) => {
    res.render('transaction/withdraw', {title: "Withdraw"});
}

const withdrawpost = async (req, res) => {
    let user = await User.findOne({ username:  req.body.user});

    if(!user)
    {
        res.status(401).json({
            message: "User doesn't exist"
        })
    }
    else if(req.body.amount > user.balance)
    {   
        let balance = user.balance;
        res.status(400).json({
            message: `Please enter amount less than ${balance}`,
        })
    }
    else
    {
        user.balance -= req.body.amount;
        user.save();
        History.create({
            username: user.username,
            type: "Withdraw",
            amount: req.body.amount,
        })
        res.redirect('/');
    }
}

module.exports = {
    history,
    transactionform,
    depositform,
    depositpost,
    withdrawform,
    withdrawpost,
    transactionpost,
    home
}