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

export const getPosts = (page, callback) => {
  let skip = 0;

  if (page > 1)
    skip = (page*10) - 10;

  Post.find().sort({"createdAt": 'asc'}).skip(skip).limit(10).exec((err, posts) => {
    if(err)
      callback(err, null);
    
    else
      callback(null, posts);
  });
};

export const getPostById = (id, callback) => {
  Post.findById(id, callback);
};

export const getPostByHeading = (heading, callback) => {
  let query = {"heading": {$regex: RegExp(`.*${heading}.*`), $options: 'i'}};

  Post.find(query, callback);
};

export const createPost = (post, callback) => {
  post.save(callback);
};