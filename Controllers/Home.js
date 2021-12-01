class Home {
    static get(req, res) {
        res.send({
            msg: 'API is Working'
        })
    }
}

module.exports = Home