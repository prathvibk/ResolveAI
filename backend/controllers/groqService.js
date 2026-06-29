const axios = require('axios')

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const generateAnswer = async (userQuestion, contextArticles) => {
  const context = contextArticles
    .map((article) => `Title: ${article.title}\nContent: ${article.content}`)
    .join('\n\n')

  const systemPrompt = `You are a helpful customer support agent for ResolveAI.
Answer the user's question using ONLY the information provided in the context below.
If the answer is not in the context, say "I don't have information about that. Let me connect you to a human agent."
Keep your answer short, friendly, and clear.

CONTEXT:
${context}`

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userQuestion }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.log('Groq error:', error.message)
    throw error
  }
}

module.exports = generateAnswer