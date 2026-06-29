require('dotenv').config()
const mongoose = require('mongoose')
const Article = require('./models/Article')

const sampleArticles = [
  {
    title: 'How to reset your password',
    content: 'To reset your password, go to Settings, click on Security, then click Reset Password. You will receive a link on your registered email. Click the link and set a new password.',
    category: 'account'
  },
  {
    title: 'How to track your order',
    content: 'To track your order, go to My Orders section, select the order you want to track, and click Track Order. You will see real-time status updates including dispatch and delivery dates.',
    category: 'orders'
  },
  {
    title: 'Refund policy',
    content: 'Refunds are processed within 5-7 business days after the returned product is received and inspected. The amount will be credited to your original payment method.',
    category: 'billing'
  },
  {
    title: 'How to cancel an order',
    content: 'You can cancel an order within 24 hours of placing it. Go to My Orders, select the order, and click Cancel Order. After 24 hours, cancellation may not be possible if the order has been shipped.',
    category: 'orders'
  },
  {
    title: 'Contacting customer support',
    content: 'You can reach our customer support team via chat, email at support@resolveai.com, or call our toll-free number available on the Contact Us page. Support is available 9 AM to 9 PM daily.',
    category: 'general'
  }
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected for seeding')

    await Article.deleteMany({})
    console.log('Old articles cleared')

    await Article.insertMany(sampleArticles)
    console.log('Sample articles added successfully!')

    mongoose.connection.close()
  } catch (error) {
    console.log('Seeding failed:', error.message)
  }
}

seedDB()