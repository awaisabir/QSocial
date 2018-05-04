import express from 'express';
import jwt from 'jsonwebtoken';

const { User } = require('../db/index').default;
const router = express.Router();

/** Register Endpoint */
router.post('/register', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  
  try {
    const user = await User.getUserByUsername(username);

    if (user.length !== 0)
      return res.json({succes: false, message: 'A user with that username/email already exists'});

    let newUser = User.build({
      username, password, email, firstName, lastName, image: ''
    });

    const result = await User.saveUser(newUser);
    return res.json({success: true, message: 'Successfully registered! You may now login ...'});
    
  } catch (error) { 
    return res.json({succes: false, message: 'Something went wrong at our end. Please try again later ...'}); 
  }
});

/** Login Endpoint */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.getUserByUsername(username);
    
    if (user.length === 0)
      return res.json({success: false, message: 'Incorrect username/password'});
    
    user = user[0];
    const isMatch = await User.comparePasswords(password, user.password);
    
    if (isMatch) {
      const { id, username, email, isAdmin, firstName, lastName, createdAt } = user;
      const token = jwt.sign({
        id, username, email, isAdmin, firstName, lastName, createdAt
      }, process.env.SECRET, {expiresIn: '365d'});
      
      return res.json({
        success: true,
        token: `Bearer ${token}`,
        user: { id: user.id }
      });
    };
  } catch (error) {
    return res.json({success: false, message: 'Something went wrong at our end. Please try again later ...'});
  }
});

module.exports = router;