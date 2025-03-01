import "./globals.css";
import SessionWrapper from "./components/SessionWrapper"; 

export const metadata = {
  title: "Xennium Airdrop | Free XENX Crypto Giveaway",
  description: "Claim your free XENX tokens now! Connect Discord, submit your wallet, and receive 10 XENX instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* SEO Meta Tags */}
        <meta name="keywords" content="Xennium Airdrop, Free XENX, Free Crypto Airdrop, Web3 Rewards, Crypto Giveaway, NFTs" />
        <meta name="author" content="Xennium Team" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags (For Social Sharing) */}
        <meta property="og:title" content="Xennium Airdrop | Free XENX Crypto Giveaway" />
        <meta property="og:description" content="Claim your free XENX tokens now! Connect Discord, submit your wallet, and receive 10 XENX instantly." />
        <meta property="og:url" content="https://airdrop.xennium.org" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Xennium Airdrop | Free XENX Crypto Giveaway" />
        <meta name="twitter:description" content="Claim free XENX tokens instantly! Connect Discord and get rewarded." />
        <meta name="twitter:image" content="/images/airdrop-banner.webp" />
        <meta name="twitter:site" content="@Xenniumx" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://airdrop.xennium.org" />

        {/* Schema.org JSON-LD for Rich Results */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Xennium Airdrop",
          "url": "https://airdrop.xennium.org",
          "description": "Claim your free XENX tokens now! Connect Discord, submit your wallet, and receive 10 XENX instantly.",
        }) }} />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      
      <body className="antialiased">
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
