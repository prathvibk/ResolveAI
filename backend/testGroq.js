require('dotenv').config()
const axios = require('axios')

const test = async () => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: 'Say hello' }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('SUCCESS:', response.data.choices[0].message.content)
  } catch (error) {
    console.log('FAILED:', error.response?.data || error.message)
  }
}

test()