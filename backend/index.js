// 1. Import dotenv FIRST and load environment variables
require('dotenv').config()

// 2. Import Express
const express = require('express')

// 3. Import our database connection function
const connectDB = require('./config/db')
const chatRoutes = require('./routers/chat')
const cors = require('cors')
// 4. Create the app
const app = express()

// 5. Connect to MongoDB
connectDB()

// 6. Tell Express to understand JSON
app.use(cors())
app.use(express.json())

// 7. First route - just to test
app.get('/', (req, res) => {
  res.json({ message: 'ResolveAI server is running!' })
})
app.use('/api/chat', chatRoutes)

// 8. Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`ResolveAI server started on port ${PORT}`)
})