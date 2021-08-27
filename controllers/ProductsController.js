const Products = require('../models/Products');



const PostsController = {
    get: async (req, res) => {
        // console.log(req.userId);
        try {
            const products = await Products.find();
            // console.log(products);
            res.status(200).json({ success: true, products })
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }

    },
    getId: async (req, res) => {
        const id = req.params.id;
        try {
            const product = await Products.findOne({ id });
            // console.log(product);
            res.status(200).json({ success: true, product })
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }

    },
    post: async (req, res) => {
        const { id, name, price, status } = req.body;
        // if (!title) return res.status(400).json({ success: false, message: "Title is required!" });

        try {
            const newProducts = new Products({
                id,
                name,
                price,
                // url,
                status: status || false,
            });
            await newProducts.save()
            // .then(data => res.json(data))
            // .catch(err => res.send(err));
            console.log("post");
            res.status(200).json({ success: true, message: "created success!" });
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }
    },
    update: async (req, res) => {
        const { name, price, status } = req.body;
        const id = req.params.id;
        console.log(name);
        try {
            const newProducts = {
                name,
                price,
                status: status || false,
            };
            const product = await Products.findOneAndUpdate({ id }, newProducts, { new: true });
            // .then(data => res.json(data))
            // .catch(err => res.send(err));
            console.log(product);
            console.log("put");
            res.status(200).json({ success: true, message: "updated success!" });
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const product = await Products.findOneAndDelete({ id });
            console.log(product);
            res.status(200).json({ success: true, product })
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }
    },
}

module.exports = PostsController;