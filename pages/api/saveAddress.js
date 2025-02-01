// pages/api/saveAddress.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db('Airdrops');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { walletAddress, discordUsername } = req.body;
    
    // Log the incoming data for debugging
    console.log('Received data:', { walletAddress, discordUsername });

    if (!walletAddress || !discordUsername) {
      return res.status(400).json({ message: 'Missing data' });
    }

    try {
      const db = await connectDB();
      const collection = db.collection('Addresses');
      await collection.insertOne({ walletAddress, discordUsername });
      return res.status(200).json({ message: 'Address saved successfully' });
    } catch (error) {
      console.error('Error saving address:', error);
      return res.status(500).json({ message: 'Error saving address' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
