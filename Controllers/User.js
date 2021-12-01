const { validationResult } = require("express-validator")


// Custom Result
const fieldErrorResults = validationResult.withDefaults({
    formatter: (error) => {
        return {
            [error.param]: error.msg,
        }
    }
})

class UserController {
    static signup(req, res) {
        const errors = fieldErrorResults(req);
        if (errors.isEmpty()) {
            return res.send('Signup Route')
        }
        else return res.json(errors.array());
    }

    static login(req, res) {
        res.send('Login Route')
    }
}

module.exports = UserController