const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title : String,
  time : String,
  place : String,
  description : String,
	imageUrl : String,
	rsvp : [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
	user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
	createdAt: {
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
