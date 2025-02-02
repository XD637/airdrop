import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db('Airdrops');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { walletAddress, discordUsername, email } = req.body;

  if (!walletAddress || !discordUsername || !email) {
    return res.status(400).json({ message: 'Missing wallet address, Discord username, or email' });
  }

  try {
    const db = await connectDB();
    const collection = db.collection('Addresses');

    // Check if wallet address, Discord username, or email already exists
    const existingEntry = await collection.findOne({
      $or: [{ walletAddress }, { discordUsername }, { email }]
    });

    if (existingEntry) {
      return res.status(409).json({
        message: 'Wallet address, Discord username, or email already exists'
      });
    }

    // Insert new record if it's unique
    await collection.insertOne({ walletAddress, discordUsername, email });

    return res.status(200).json({ message: 'Address saved successfully' });
  } catch (error) {
    console.error('Error saving address:', error);
    return res.status(500).json({ message: `Error saving address: ${error.message}` });
  }
}
