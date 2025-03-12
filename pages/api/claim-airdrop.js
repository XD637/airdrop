import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { wallet } = req.body;

  try {
    // Process airdrop claim logic here...
    return res.json({ success: true, message: "Airdrop claimed successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
