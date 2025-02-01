import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { wallet, captchaToken } = req.body;
  const secretKey = process.env.HCAPTCHA_SECRET_KEY; 

  try {
    const response = await axios.post(
      "https://api.hcaptcha.com/siteverify",
      new URLSearchParams({ secret: secretKey, response: captchaToken })
    );

    if (!response.data.success) {
      return res.status(400).json({ error: "hCaptcha verification failed" });
    }

    // Process airdrop claim logic here...
    return res.json({ success: true, message: "Airdrop claimed successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
