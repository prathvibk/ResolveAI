const express = require('express')
const router = express.Router()
const searchSimilarArticles = require('../controllers/vectorSearchService')
const generateAnswer = require('../controllers/groqService')

router.post('/', async (req, res) => {
  const userMessage = req.body.message

  console.log('User said:', userMessage)

  try {
    const relevantArticles = await searchSimilarArticles(userMessage, 3)

    console.log('Found relevant articles:', relevantArticles.map(a => a.title))

    const aiReply = await generateAnswer(userMessage, relevantArticles)

    res.json({ reply: aiReply })

  } catch (error) {
    console.log('Chat error:', error.message)
    res.status(500).json({ reply: 'Something went wrong. Please try again.' })
  }
})

module.exports = router