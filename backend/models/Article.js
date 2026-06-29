const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'general'
  },
  embedding: {
    type: [Number],
    default: []
  }
}, { timestamps: true })

module.exports = mongoose.model('Article', articleSchema)