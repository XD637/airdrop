export default async function handler(req, res) {
    const { accessToken } = req.query;
    const serverId = "1308320261229117500"; // Replace with your Discord server ID
  
    try {
      const response = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const guilds = await response.json();
  
      // Check if user is in your Discord server
      const isMember = guilds.some((guild) => guild.id === serverId);
      
      res.status(200).json({ isMember });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch guilds" });
    }
  }
  