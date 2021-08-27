const express = require('express');
const app = express();
const db = require('./config/db');
require('dotenv/config');
const router = require('./routes');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// const postsRoute = require('./routes/posts');

// const port = 1234;


db.connect();

router(app);
// app.use('/posts', postsRoute);


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});