// Authentication setup
import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/db'
import * as User from '../models/User'
const router = express.Router()

/** Register Endpoint */
router.post('/register', (req, res) => {
  let {username, password, email, firstName, lastName} = req.body

  let newUser = new User.User({
    username, password, email, firstName, lastName
  })

  User.getUserByUsername(newUser.username, (err, user) => {
    if (err)
      return res.json({success: false, message: 'Something went wrong at our end. Please try again later ...'})
      
      if (user) {
        return res.json({success: false, message: 'A user with that username/email already exists'})
      }
      
      else {
        User.saveUser(newUser, (err, user) => {
          if (err)
          return res.json({success: false, message: 'Something went wrong at our end. Please try again later ...'})
          
          else
            return res.json({success: true, message: 'Successfully registered! You may now login ...'})
      })
    }
  })
})

/** Login Endpoint */
router.post('/login', (req, res) => {
  let {username, password} = req.body

  User.getUserByUsername(username, (err, user) => {
    
    if (err)
    return res.json({success: false, message: 'Incorrect username/password'})
    
    if (!user) 
    return res.json({success: false, message: 'Incorrect username/password'})
    
    else {
      User.comparePasswords(password, user.password, (err, isMatch) => {
        
        if (err)
        return res.json({success: false, message: 'Something went wrong at our end. Please try again later ...'})
          
          if (isMatch) {
            const token = jwt.sign({user}, config.auth_secret, {expiresIn: 86400})
            
            res.json({
              success: true,
              token: 'Bearer '+token,
              user : {
                id: user._id,
              }
            })
          } else {
            return res.json({success: false, message: 'Incorrect username/password'})
        }
      })
    }
  })
})

router.get('/authorize', (req, res) => {
  let authToken = req.headers.authorization
  console.log(authToken)
  jwt.verify(authToken, config.auth_secret, (err, result) => {
    if (err)
      return res.json({success: false, err: err})
    else {
      
      return res.json({succes: true, err: null})  
    }
  })
})

export default router