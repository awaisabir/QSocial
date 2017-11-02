// Posts Model
import mongoose from 'mongoose';
import User from './User';
import Comment from './Comment';
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    user_id: {type: ObjectId, ref: 'User', required: true},
    username: {type: String, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now(), required: true},
    editedAt: {type: Date, default: Date.now(), required: true},
    edited: {type: Boolean, default: false},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    category: {type: String, required: true},
    locked: {type: Boolean, default: false},
    content: {type: String, required: true},
    heading: {type: String, required: true},
    thumbnail: String,
    comments: [{type: ObjectId, ref: 'Comment'}]
});

export const Post = mongoose.model('Post', PostSchema);

export const getPosts = (page, heading, order, callback) => {
  let skip = 0;
  let query = {};
  let sort = {_id: -1};

  if (page > 1)
    skip = (page*10) - 10;
  
  if (heading)
    query = {'heading': {$regex: RegExp(`${heading}`), $options: 'i'}};

  if (order === 'asc') 
    sort = {_id: 1};

  Post.find(query).sort(sort).skip(skip).limit(10).exec((err, posts) => {
    if(err)
      callback(err, null);
    
    else {
      callback(null, posts);
    }
  });
};

export const getPostById = (id, callback) => {
  Post.findById(id, callback);
};

export const createPost = (post, callback) => {
  post.save(callback);
};

export const deletePost = (id, callback) => {
  Post.findByIdAndRemove(id, callback);
}

export const updatePost = (id, updates, callback) => {
  let query = {};
  query.$set = {};
  let { heading, content, category } = updates;

  if (heading !== undefined) query.$set.heading = heading;
  if (content !== undefined) query.$set.content = content;
  if (category !== undefined) query.$set.category = category;
  query.$set.edited = true;
  query.$set.editedAt = Date.now();

  Post.findByIdAndUpdate(id, query, {new: true}, (err, post) => {
    if (err)
      callback(err, null);

    callback(null, post);
  });
}