# ResolveAI 🤖

AI-powered customer support chatbot built with the MERN stack, using **RAG (Retrieval-Augmented Generation)** to answer customer queries based on a custom knowledge base.

## 🎯 What it does

Instead of giving generic AI answers, ResolveAI searches through your company's actual support articles and uses that context to generate accurate, grounded responses — just like a real support agent who has read your documentation.

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas (with Vector Search)
- **Embeddings:** HuggingFace API
- **AI Generation:** Groq API (Llama 3)

## 📐 How it works

1. Support articles are chunked and converted into vector embeddings
2. Embeddings are stored in MongoDB Atlas
3. When a user asks a question, it's converted into a vector
4. MongoDB finds the most relevant article chunks via vector similarity search
5. Those chunks + the question are sent to the AI model
6. AI generates an answer grounded in the retrieved context

## 📁 Project Structure

\`\`\`
resolveai/
├── backend/
│   ├── config/        # Database connection
│   ├── models/        # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── controllers/    # Route logic
│   └── index.js        # Server entry point
└── frontend/
    └── src/
        ├── App.jsx      # Main chat component
        └── App.css      # Styling
\`\`\`

## 🚀 Getting Started

### Backend
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## 📅 Project Status

🚧 **Work in progress** — building this as a learning project to understand RAG, MERN stack, and AI integration end-to-end.

## 📝 Progress Log

- [x] Express server setup
- [x] MongoDB Atlas connection
- [x] React frontend initialized
- [ ] Knowledge base model + sample data
- [ ] Embedding generation pipeline
- [ ] Vector search implementation
- [ ] Chat UI with backend integration
- [ ] AI-powered response generation

---

*Built as a hands-on learning project to understand RAG and full-stack AI applications.*
