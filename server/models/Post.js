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
    content: {type: String, required: true, },
    heading: {type: String, required: true},
    thumbnail: String,
    comments: [{type: ObjectId, ref: 'Comment'}]
});

export default mongoose.model('Post', PostSchema);