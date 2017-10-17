import express from 'express';
import passport from 'passport';
import * as User from '../models/User';

const router = express.Router();

router.get('/:id', (req, res) => {
  let { id } = req.params;

  User.getUserById(id, (err, user) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Please try again later ...'});
  
    if (!user)
      return res.json({success: false, message: 'id does not exist'});

    return res.json({success: true, user});
  });
});

router.get('/', (req, res) => {
  let { username } = req.query;

  User.getUserByUsername(username, (err, user) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong! Please try again later ...'});
    
    if (!user)
      return res.json({success: false, message: 'Username does not exist'});
 
    return res.json({success: true, user});
  });
});

export default router;


/** GET user by ID */
/** GET all users (paginated) */
/** Update stuff about a user */