const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/userModel");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, gender, pass, age, city } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, secure_password) => {
            if (err) {
                console.log(err);
            }
            else {
                const user = new userModel({ name, email, gender, pass: secure_password, age, city });
                await user.save();
                res.send({ "msg": "User Register Successfully" })
            }
        });

    }
    catch (err) {
        res.send({ "msg": "Something went wrong while registering" });
        console.log(err);
    }
});


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await userModel.find({ email });
        const hased_pass = user[0].pass;
        if (user.length > 0) {
            bcrypt.compare(pass, hased_pass, (err, result) => {
                if (result) {
                    // const token = jwt.sign({ userID: user[0]._id }, process.env.key);
                    const token = jwt.sign({ nem: 'evaluation' }, process.env.key);
                    res.send({ "msg": "Login Successfully", "token": token });
                }
                else {
                    res.send("wrong credentials");
                }
            });
        }
        else {
            res.send("wrong credentials");
        }
    }
    catch (err) {
        res.send({ "msg": "Something went wrong while loging" });
        console.log(err);
    }
})

module.exports = { userRouter };



// name ==> String
// email ==> String
// gender ==> String
// password ==> String
// age ==> Number
// city ==> String