const Post = require('../models/Post');


const test = () => console.log("test");
class PostsController {


    // GET '/news'
    get = async (req, res) => {
        console.log(req.userId);
        try {
            const posts = await Post.find({ user: req.userId }).populate('user', ['username',]);
            console.log(posts);
            res.status(200).json({ success: true, posts })
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }

    }

    post = async (req, res) => {
        const { title, description, url, status } = req.body;
        if (!title) return res.status(400).json({ success: false, message: "Title is required!" });

        try {
            const newPost = new Post({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                // url,
                status: status || "TO LEARN",
                user: req.userId
            });
            await newPost.save()
            // .then(data => res.json(data))
            // .catch(err => res.send(err));

            res.status(200).json({ success: true, message: "Happy learning!" });
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }
    }

    update = async (req, res) => {
        const { title, description, url, status } = req.body;
        if (!title) return res.status(400).json({ success: false, message: "Title is required!" });

        try {
            let updatePost = {
                title,
                description: description || '',
                url: (url.startsWith('https://') ? url : `https://${url}`) || '',
                // url,
                status: status || "TO LEARN",
            }
            const postUpdateCondition = { _id: req.params.id, user: req.userId }
            updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true });
            if (!updatePost) return res.status(401).json({ success: false, message: 'update khong thanh cong' });
            res.json({ success: true, post: updatePost })
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }
    }
    delete = async (req, res) => {
        try {
            const postDeleteCondition = { _id: req.params.id, user: req.userId }
            console.log(req.userId);

            // cach 1
            // const deletePost = await Post.findOneAndDelete(postDeleteCondition);
            // if (!deletePost) return res.status(401).json({ success: false, message: 'delete khong thanh cong' });

            // cach 2
            await Post.findOneAndDelete(postDeleteCondition, (err, post) => {
                if (err) console.log(err);
                console.log(post);
                test();
            })
            // cai nay khong lien quan, cach nao cung dung dc
            res.json({ success: true })
        } catch (error) {
            res.status(400).json({ message: "loi cmnr" });
        }
    }
};

module.exports = new PostsController;