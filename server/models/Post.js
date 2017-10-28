// Posts Model
import mongoose from 'mongoose';
import User from './User';
import Comment from './Comment';
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    createdBy: { type: ObjectId, ref: 'User', required: true },
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
  
  if (page > 1)
  skip = (page*10) - 10;
  
  if (heading)
    query = {"heading": {$regex: RegExp(`${heading}`), $options: 'i'}};

  if (!order) 
    order = "desc";

  Post.find(query).sort({"createdAt": order}).skip(skip).limit(10).exec((err, posts) => {
    if(err)
      callback(err, null);
    
    else {
      let response = {posts, count: posts.length};
      callback(null, response);
    }
  });
};

export const getPostById = (id, callback) => {
  Post.findById(id, callback);
};

export const createPost = (post, callback) => {
  post.save(callback);
};