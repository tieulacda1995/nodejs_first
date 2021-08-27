class NewsController {


    // GET '/news'
    index = (req, res) => {
        res.send('News');
    }

    // params

    show = (req, res) => {
        res.send("slug")
    }
};

module.exports = new NewsController;