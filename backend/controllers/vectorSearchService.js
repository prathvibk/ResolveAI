const Article = require('../models/Article')
const getEmbedding = require('./embeddingService')

const searchSimilarArticles = async (userQuestion, topK = 3) => {
  const queryEmbedding = await getEmbedding(userQuestion)

  const results = await Article.aggregate([
    {
      $vectorSearch: {
        index: 'vector_index',
        path: 'embedding',
        queryVector: queryEmbedding,
        numCandidates: 50,
        limit: topK
      }
    },
    {
      $project: {
        title: 1,
        content: 1,
        category: 1,
        score: { $meta: 'vectorSearchScore' }
      }
    }
  ])

  return results
}

module.exports = searchSimilarArticles