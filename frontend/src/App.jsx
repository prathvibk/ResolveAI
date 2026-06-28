import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')

  return (
    <div className="chat-container">
      <h1>ResolveAI Support Chat</h1>
      <input
        type="text"
        placeholder="Type your question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button>Send</button>
    </div>
  )
}

export default App