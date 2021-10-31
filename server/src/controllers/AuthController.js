const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('../../models/User');
const User = mongoose.model('users');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, keys.JWT_SECRET, {
        expiresIn: ONE_WEEK
    })
}
module.exports = {
    // Register New User
    register(req, res) {
        const newUser = new User({
            email: req.body.email.toLowerCase(),
            password: req.body.password
        });

        User.findOne({
            email: req.body.email.toLowerCase()
        }).then(admin => {

            if (admin) {
                res.status(400).send({
                    message: 'You already have an account! Try logging in'
                })
            } else {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const userJSON = user.toJSON()
                                const token = jwtSignUser(userJSON)
                                res.status(400).send({
                                    user: userJSON,
                                    token: token
                                })
                            })
                            .catch(err => {
                                console.log(err);

                                res.status(503).send({
                                    message: 'An error occurred'
                                })
                                return;
                            })
                    })
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(503).send({
                message: 'An error occurred'
            })
        })

    },

    //Login User
    login(req, res, next) {
        const {
            email,
            password
        } = req.body
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return res.json({
                    error: "User not found",
                })
            } else {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        const userJSON = user.toJSON()
                        res.send({
                            user: userJSON,
                            token: jwtSignUser(userJSON)
                        })
                    } else {
                        res.json({
                            error: "Login info incorrect",
                        })
                    }
                });
            }
        }).catch(err => {
            console.log(err)
        })
    }

}