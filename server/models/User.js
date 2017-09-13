// User Model
import mongoose from 'mongoose'
import Post from './Post'

const ObjectId = mongoose.SchemaTypes.ObjectId

const UserSchema = new mongoose.Schema({
    _id: {type: String},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    posts: [{type: ObjectId, ref: 'Post'}],
    isAdmin: Boolean,
})

export default mongoose.model('User', UserSchema)