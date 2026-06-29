require('dotenv').config()
const mongoose = require('mongoose')
const searchSimilarArticles = require('./controllers/vectorSearchService')

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    const results = await searchSimilarArticles('I want my money back for a product')

    console.log('Search results:')
    console.log(JSON.stringify(results, null, 2))

    mongoose.connection.close()
  } catch (error) {
    console.log('Error:', error.message)
  }
}

test()