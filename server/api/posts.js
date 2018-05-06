import express from 'express';
import passport from 'passport';

const { Post, Category } = require('../db/index').default;
const router = express.Router();

// get posts
router.get('/', async (req, res) => {
  let { page, heading, order, categories } = req.query;

  if (!page)
    page = 1;

  if (!order)
    order = 'ASC';

  try {
    const posts = await Post.getPosts(page, heading, order);

    if (posts.length === 0)
      return res.json({success: true, message: 'There are no posts under the specified criteria'});

    return res.json({success: true, posts});
  } catch (error) { 
    console.log(error);
    return res.json({success: false, message: 'Something went wrong at our end! ...'}); 
  }
});

// create a new post
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { id } = req.user;
  const { user_id, content, heading } = req.body;
  let { categories } = req.body;

  try {
    let c = [];
    categories.split(',').map(category => c.push({category}));

    // for each category check if they already exist <-- bug I need to fix
  
    const postToSave = Post.build({
      content, 
      heading,
      UserId: id,
      Categories: c,
    }, { include : [ Category ] });

    const post = await Post.savePost(postToSave);
    return res.json({success: true, message: 'Post was successfully created!', post: post.get({plain: true})});
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: 'Something went wrong on our end!'});
   }
});

// get post by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const postArray = await Post.getPostById(id);
    if (postArray.length === 0)
      return res.json({success: true, message: 'There are no posts under the specified criteria'});

    const post = postArray[0];
    return res.json({success: true, post});

  } catch (error) { 
    console.log(error);  
    return res.json({success: false, message: 'Something went wrong at our end! ...'}); 
  }
});

// update a post
router.patch('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  let { id } = req.params;
  const userId = req.user._id;
  let { category, content, heading, liked } = req.body;

  
});

// delete a post
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Post.deletePost(id);
    return res.json({success: true, message: 'Post was successfully deleted!'})
  } catch (error) { 
    return res.json({success: false, message: 'Something went wrong on our end!'});    
  }
});

// like a post
router.post('/:id/like', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { id } = req.params;

  
});

// dislike a post
router.post('/:id/dislike', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { id } = req.params;

  
});

module.exports = router;