const { validationResult } = require("express-validator")
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Custom Result
const fieldErrorResults = validationResult.withDefaults({
    formatter: (error) => {
        return error.msg
    }
})

class UserController {
    static async signup(req, res) {
        const errors = fieldErrorResults(req);
        if (errors.isEmpty()) {
            const { name, email, password, phone } = req.body;
            const salt = bcrypt.genSaltSync(10);
            let hashPassword = bcrypt.hashSync(password, salt);
            const user = await new User({ name, email, password: hashPassword, phone }).save();
            res.send({
                msg: 'Account sucessfully created!',
                payload: user
            })
        }
        else return res.json(errors.mapped());
    }

    static async login(req, res) {
        const errors = fieldErrorResults(req);
        if (errors.isEmpty()) {
            const { email, password } = req.body;
            let user = await User.findOne({ email }).lean().exec();
            if (!user) {
                res.status(400).send({
                    msg: 'There is no user in this email'
                })
            }
            else {
                if (bcrypt.compareSync(password, user.password)) {
                    const { name, email, phone, active } = user;
                    const token = jwt.sign({ name, email, phone, active }, 'MY_SECRECT3693');
                    res.send({ token: 'Bearer ' + token })
                }
                else {
                    res.status(400).send({
                        msg: 'Password doesn\'t match'
                    })
                }
            }
        }
        else return res.status(422).json(errors.mapped());
    }

    static async activeUser(req, res) {
        try {
            await User.updateOne(
                { _id: req.params.id },
                {
                    $set:
                        { active: true }
                }
            ).exec();
            res.send('User Activated Successfully');
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async deleteUser(req, res) {
        try {
            await User.deleteOne(
                { _id: req.params.id }
            ).exec();
            res.send('User Deleted Successfully');
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = UserController