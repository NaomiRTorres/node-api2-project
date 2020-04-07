
const express = require('express');

const router = express.Router();

const Posts = require('./db.js');

// ALL OF MY GETS
router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json({ queryString: req.query, posts });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving posts'
        });
    });
});

router.get('/:id', (req, res) => {
   Posts.findById(req.params.id)
   .then((post) => {
       if (post) {
           res.status(200).json(post);
       } else {
           res.status(404).json({ message: 'Post not found' });
       };
   })
   .catch(error => {
       console.log(error);
       res.status(500).json({
           message: 'Error retrieving the post'
       });
   }); 
});

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(comments => {
        res.status(200).json(comments);
    })
    .catch(err => {
        res.status(500).json({ errorMessager: 'error getting comments' });
    });
});


// ALL OF MY POSTS
router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error adding the post" });
    });
});

router.post('/:id/comments', (req, res) => {
    Posts.insertComment(req.body)
    .then((comment) => {
        res.status(200).json(comment)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "error adding comment" });
    });
});


module.exports = router;