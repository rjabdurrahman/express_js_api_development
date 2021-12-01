const Product = require('../Models/Product')

class ProductCotroller {
    static async get(req, res) {
        try {
            const products = await Product.find({
                $and: [
                    { price: { $gte: 5000 } },
                    { price: { $lte: 10000 } },
                ]
            }).lean().exec()
            res.send(products)
        } catch (error) {
            console.log(error)
            res.send('An error occured!');
        }
    }

    static async post(req, res) {
        try {
            await new Product(req.body).save()
            return res.send('OK')
        } catch (error) {
            res.send('An error occured!');
        }
    }
}

module.exports = ProductCotroller