import express from 'express';
import passport from 'passport';
import * as Post from '../models/Post';
const router = express.Router();

router.get('/', (req, res) => {
  let { page } = req.query;

  Post.getPosts(page, (err, posts) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Please try again later'});
    
    if (!posts)
      return res.json({success: false, message: 'There are no posts! ...'});

    else {
      return res.json({success: true, posts});
    }
  });  
});

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

export default router;
/** CREATE new post */
/** Update a post */
/** Delete a post */