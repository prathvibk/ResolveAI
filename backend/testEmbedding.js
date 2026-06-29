require('dotenv').config()
const getEmbedding = require('./controllers/embeddingService')

const test = async () => {
  const result = await getEmbedding('How do I reset my password?')
  console.log('Embedding result:')
  console.log(result)
  console.log('Length of vector:', result.length)
}

test()