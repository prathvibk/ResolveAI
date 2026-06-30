import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: "Hi! I'm ResolveAI 👋 Ask me anything about your account or orders." }
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (message.trim() === '') return

    const userMessage = message
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMessage }])
    setMessage('')
    setLoading(true)

    try {
      const response = await axios.post('https://resolveai-yg3k.onrender.com/api/chat', {
        message: userMessage
      })

      setChatHistory((prev) => [...prev, { sender: 'bot', text: response.data.reply }])
    } catch (error) {
      setChatHistory((prev) => [...prev, { sender: 'bot', text: 'Something went wrong. Please try again.' }])
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-wrapper">
      <div className="chat-card">

        <div className="chat-header">
          <div className="avatar">🤖</div>
          <div>
            <div className="chat-title">ResolveAI</div>
            <div className="chat-status">
              <span className="status-dot"></span> Online
            </div>
          </div>
        </div>

        <div className="chat-body">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={chat.sender === 'user' ? 'bubble bubble-user' : 'bubble bubble-bot'}
            >
              {chat.text}
            </div>
          ))}
          {loading && <div className="bubble bubble-bot">Typing...</div>}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>➤</button>
        </div>

      </div>
    </div>
  )
}

export default App