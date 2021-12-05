const { validationResult } = require("express-validator")
const User = require('../Models/User');

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
            const user = await new User({ name, email, password, phone }).save();
            res.send(user)
        }
        else return res.json(errors.mapped());
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

    static login(req, res) {
        res.send('Login Route')
    }
}

module.exports = UserController