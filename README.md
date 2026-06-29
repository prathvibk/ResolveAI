# ResolveAI 🤖

AI-powered customer support chatbot built with the MERN stack, using **RAG (Retrieval-Augmented Generation)** to answer customer queries based on a custom knowledge base.

## 🎯 What it does

Instead of giving generic AI answers, ResolveAI searches through support articles using semantic (meaning-based) search and uses that context to generate accurate, grounded responses — just like a real support agent who has read the documentation.

Example: asking "password problem" correctly retrieves the "How to reset your password" article and generates a helpful answer, even though the exact words don't match.

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + Axios
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas with Atlas Vector Search
- **Embeddings:** HuggingFace Inference API (`sentence-transformers/all-MiniLM-L6-v2`, 384 dimensions)
- **AI Generation:** Groq API (`llama-3.1-8b-instant`)

## 📐 How it works

1. Support articles are stored in MongoDB with title, content, and category
2. Each article's text is converted into a 384-dimension vector embedding via HuggingFace
3. Embeddings are saved back into MongoDB and indexed using Atlas Vector Search
4. When a user sends a message, it's converted into an embedding using the same model
5. MongoDB's `$vectorSearch` finds the most semantically similar articles using cosine similarity
6. The top matching articles are passed as context to Groq's LLM along with the user's question
7. Groq generates a natural language answer grounded only in the retrieved context
8. If no relevant article is found, the system is designed to flag for human escalation

## 📁 Project Structure

```
resolveai/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── models/
│   │   └── Article.js             # Article schema with embedding field
│   ├── controllers/
│   │   ├── embeddingService.js    # HuggingFace embedding generation
│   │   ├── vectorSearchService.js # MongoDB vector search query
│   │   └── groqService.js         # Groq LLM answer generation
│   ├── routers/
│   │   └── chat.js                # POST /api/chat - main RAG endpoint
│   ├── seed.js                     # Populates sample knowledge base
│   ├── generateEmbeddings.js       # One-time script to embed all articles
│   └── index.js                    # Server entry point
└── frontend/
    └── src/
        ├── App.jsx                 # Chat UI with state + API calls
        └── App.css                 # Styling
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (free tier) with a Vector Search Index named `vector_index` on the `articles` collection (field: `embedding`, 384 dimensions, cosine similarity)
- HuggingFace API token (Fine-grained, with "Make calls to Inference Providers" permission)
- Groq API key

### Environment Variables
Create a `.env` file inside `backend/`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
HUGGINGFACE_API_KEY=your_huggingface_token
GROQ_API_KEY=your_groq_api_key
```

### Backend
```bash
cd backend
npm install
node seed.js                  # populate sample articles
node generateEmbeddings.js    # generate embeddings for all articles
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to use the chat.

## 📅 Project Status

✅ **Core RAG pipeline complete and working end-to-end.**

## 📝 Progress Log

- [x] Express server setup
- [x] MongoDB Atlas connection
- [x] React frontend with custom chat UI
- [x] Frontend ↔ backend connection (CORS configured)
- [x] Knowledge base model + sample articles seeded
- [x] HuggingFace embedding generation pipeline
- [x] MongoDB Atlas Vector Search index + semantic search
- [x] Groq LLM integration for answer generation
- [x] Full RAG pipeline connected end-to-end
- [ ] Escalation logic for low-confidence matches
- [ ] Persistent chat history (currently resets on refresh)
- [ ] Admin panel to add/edit knowledge base articles
- [ ] Deployment (Render/Vercel)

## 🧠 What I learned building this

- How vector embeddings represent meaning mathematically, and how cosine similarity enables semantic search
- Setting up and querying MongoDB Atlas Vector Search with the `$vectorSearch` aggregation stage
- Structuring an Express app with routers, controllers, and config separation
- Connecting React to an Express backend with Axios, including handling CORS, loading states, and error handling
- Prompt engineering — constraining an LLM to answer only from retrieved context
- Debugging real-world issues: DNS/SRV connection failures, API endpoint deprecations, environment variable management, and API authentication errors

---

*Built as a hands-on learning project to understand RAG and full-stack AI applications from first principles.*
