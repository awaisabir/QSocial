import mongoose from 'mongoose'
import Post from './Post'
const ObjectId = mongoose.SchemaTypes.ObjectId

const CommentSchema = new mongoose.Schema({
    _id: {type: String},
    PostID: { type: ObjectId, ref: 'Post', required: true },
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now(), required: true},
    editedAt: {type: Date, default: Date.now(), required: true}
})

export default mongoose.model('Comment', CommentSchema)