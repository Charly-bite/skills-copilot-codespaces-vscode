// Create web server 
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Connect to the database
let db;
client.connect()
  .then(() => {
    db = client.db('commentsDB');
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Endpoint to get all comments
app.get('/comments', async (req, res) => {
  try {
    const comments = await db.collection('comments').find().toArray();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Endpoint to create a new comment
app.post('/comments', async (req, res) => {
  try {
    const comment = req.body;
    const result = await db.collection('comments').insertOne(comment);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
