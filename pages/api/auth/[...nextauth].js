import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: "identify email guilds" } }, // Added 'email' scope
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.email = profile.email; // Store email in token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.email = token.email; // Add email to session
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
