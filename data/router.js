
const express = require('express');

const router = express.Router();

const Posts = require('./db.js');

// ALL OF MY GET REQUESTS
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


// ALL OF MY POST REQUESTS
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


// DELETE REQUEST
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
    .then((count) => {
        if(count) {
            res.status(200).json({ message: 'successfully nuked your post'});
        } else {
            res.status(404).json({ message: 'post not found' });
        };
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'something failed, sorry'});
    });
});


// PUT REQUEST  
router.put('/:id', (req, res) => {
    const changes = req.body;
    console.log('changes:', changes);
    Posts.update(req.params.id, changes)
    .then((count) => {
        if (count) {
            Posts.findById(req.params.id)
            .then((post) => {
                res.status(200).json(post);
            })
            .catch((err) => {
                res.status(500).json({ errorMessage: 'error reading the post' });
            });
        } else {
            res.status(404).json({ message: 'The post could not be found' });
        };
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the post'
        });
    });
});



module.exports = router;