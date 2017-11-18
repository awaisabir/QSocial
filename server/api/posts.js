import express from 'express';
import passport from 'passport';
import * as Post from '../models/Post';
const router = express.Router();

// get posts
router.get('/', (req, res) => {
  let { page, heading, order, categories } = req.query;

  if (!page)
    page = 1;

  Post.getPosts(page, heading, order, categories, (err, modelData) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Please try again later'});
    
    if (!modelData)
      return res.json({success: false, message: 'There are no posts! ...'});

    else {
      const count = modelData.posts.length;
      const totalPosts = modelData.total;
      const posts = modelData.posts;
      const response = {success: true, count, posts, totalPosts};
      return res.json(response);
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
  const { username } = req.user;
  const { user_id, categories, content, heading } = req.body;

  const newPost = new Post.Post({user_id, username, categories, content, heading});
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
  let { id } = req.params; 
  let { category, content, heading } = req.body;

  Post.updatePost(id, {category, content, heading}, (err, post) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Please try again later ...'});
      
    if (!post)
      return res.json({success: false, message: 'Something went wrong! Please try again later ...'});

    return res.json({success: true, post});
  });
});

// delete a post
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { id } = req.params;

  Post.deletePost(id, (err, post) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Please try again ...'});
      
    if (!post) 
      return res.json({success: false, message: 'Something went wrong! Please try again ...'});

    return res.json({success: true, message: 'Post has been deleted!', post});
  });
});

export default router;