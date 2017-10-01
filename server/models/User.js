// User Model
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import Post from './Post'

const ObjectId = mongoose.SchemaTypes.ObjectId

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    posts: [{type: ObjectId, ref: 'Post'}],
    isAdmin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now(), required: true}
})

export const User = mongoose.model('User', UserSchema)

export const getUserById = (id, callback) => {
  User.findById(id, callback)
}

export const getUserByUsername = (username, callback) => {
  const query = {username}
  User.findOne(query, callback)
}

export const getUserByEmail = (email, callback) => {
  const query = {email}
  User.findOne(query, callback)
}

export const saveUser = (user, callback) => {
  bcrypt.genSalt(15, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err)
        throw err
      
      user.password = hash
      user.save(callback)
    })
  })
}

export const comparePasswords = (entered, actual, callback) => {
  bcrypt.compare(entered, actual, (err, isMatch) => {
    if (err)
       callback(err, null)

    else {
      callback(null, isMatch)
    }
  })
}