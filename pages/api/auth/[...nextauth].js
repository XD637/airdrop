import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: "identify guilds" } }, // Ensure 'guilds' scope is included
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // Store Discord access token in JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.accessToken = token.accessToken; // Expose access token to the session
      return session;
    },
  },
});
