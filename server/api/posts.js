import express from 'express';
import passport from 'passport';
import * as Post from '../models/Post';
const router = express.Router();

// get posts
router.get('/', (req, res) => {
  let { page, heading, order } = req.query;

  if (!page)
    page = 1;

  Post.getPosts(page, heading, order, (err, posts) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Please try again later'});
    
    if (!posts)
      return res.json({success: false, message: 'There are no posts! ...'});

    else {
      let response = {posts, count: posts.length};
      return res.json({success: true, response});
    }
  });
});

// get post by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Post.getPostById(id, (err, post) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Plese try again later ...'});

    if (!post)
      return res.json({success: false, message: 'No Post(s) Found'});

    return res.json({success: true, post});
  });
});

// create a new post
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { createdBy, category, content, heading } = req.body;

  const newPost = new Post.Post({createdBy, category, content, heading});
  Post.createPost(newPost, (err, post) => {
    if (err)
      return res.json({success: false, message: 'There was an error on our part! Please try again later ...'});
      
    if (!post)
      return res.json({success: false, message: 'There was an error on our part! Please try again later ...'});

    return res.json({success: true, message: 'Post successfully created!', post});
  });
});

// update a post
router.patch('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

});

// delete a post
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

});

export default router;