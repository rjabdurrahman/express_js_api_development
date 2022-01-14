class OrderController {
    static getAll(req, res) {
        res.send([
            'Order 1',
            'Order 2',
            'Order 3',
        ]);
    }
}

module.exports = OrderController;