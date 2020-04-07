const express = require('express');

const postRouter = require('./data/router.js');

const server = express();

server.use(express.json());

server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Posts API</h2>
    <p>Welcome to the Lambda Posts API</p>
    `);
});

server.listen(4000, () => {
    console.log('\n === Server Running on http://localhost:4000 ===\n')
})

