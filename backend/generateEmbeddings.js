require('dotenv').config()
const mongoose = require('mongoose')
const Article = require('./models/Article')
const getEmbedding = require('./controllers/embeddingService')

const generateAllEmbeddings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    const articles = await Article.find({})
    console.log(`Found ${articles.length} articles`)

    for (const article of articles) {
      console.log(`Generating embedding for: ${article.title}`)

      const textToEmbed = article.title + ' ' + article.content
      const embedding = await getEmbedding(textToEmbed)

      article.embedding = embedding
      await article.save()

      console.log(`Saved embedding for: ${article.title}`)
    }

    console.log('All embeddings generated successfully!')
    mongoose.connection.close()
  } catch (error) {
    console.log('Error:', error)
  }
}

generateAllEmbeddings()