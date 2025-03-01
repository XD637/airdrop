"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Head from "next/head"; // SEO
import Image from "next/image"; // Optimized image handling
import Navbar from "./components/Navbar";
import AuthButton from "./components/AuthButton";
import AirdropForm from "./components/AirdropForm";
import LoadingSpinner from "./components/LoadingSpinner";
import NotMemberMessage from "./components/NotMemberMessage";
import Footer from "./components/Footer";
import Link from "next/link"; // Internal linking

export default function Airdrop() {
  const { data: session } = useSession();
  const [isMember, setIsMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [airdropLoading, setAirdropLoading] = useState(false);
  const lastCheckedRef = useRef(null);

  useEffect(() => {
    if (session) {
      const now = Date.now();
      if (!lastCheckedRef.current || now - lastCheckedRef.current > 30000) {
        setLoading(true);
        lastCheckedRef.current = now;

        fetch(`/api/check-membership?accessToken=${session.accessToken}`)
          .then((res) => res.json())
          .then((data) => setIsMember(data.isMember))
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      }
    }
  }, [session]);

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Xennium Airdrop - Claim Free XENX Tokens</title>
        <meta
          name="description"
          content="Claim your free XENX tokens! Connect Discord and submit your wallet to receive 10 XENX tokens instantly."
        />
        <meta
          name="keywords"
          content="Airdrop, Free crypto, XENX tokens, Crypto rewards, NFTs, Web3 airdrop"
        />
        <meta name="author" content="Xennium Team" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook) */}
        <meta property="og:title" content="Xennium Airdrop - Claim Free XENX Tokens" />
        <meta
          property="og:description"
          content="Claim free XENX tokens by connecting Discord. Secure, easy, and instant rewards!"
        />
        <meta property="og:url" content="https://airdrop.xennium.org" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Xennium Airdrop - Claim Free XENX Tokens" />
        <meta
          name="twitter:description"
          content="Claim free XENX tokens by connecting Discord. Secure, easy, and instant rewards!"
        />
        <meta name="twitter:site" content="@Xenniumx" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://airdrop.xennium.org" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Xennium Airdrop",
            "url": "https://airdrop.xennium.org",
            "description":
              "Claim free XENX tokens by connecting Discord. Secure, easy, and instant rewards!",
            "author": { "@type": "Organization", "name": "Xennium" },
          })}
        </script>
      </Head>

      <div className="min-h-screen flex flex-col bg-black/60 text-gray-200">
        <Navbar />

        <main className="flex-grow flex flex-col items-center justify-center w-full px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white">Claim Your Free XENX Tokens</h1>
          <h2 className="text-md text-gray-400 mt-3">
            Connect Discord and submit your wallet address to claim 10 XENX Tokens for Free.
          </h2>

          <section className="mt-6">
            {session ? (
              loading ? (
                <LoadingSpinner />
              ) : isMember === null ? null : isMember ? (
                airdropLoading ? (
                  <LoadingSpinner />
                ) : (
                  <AirdropForm />
                )
              ) : (
                <NotMemberMessage />
              )
            ) : (
              <AuthButton />
            )}
          </section>

          {/* Privacy Policy & Terms */}
          <div className="mt-6 text-center">
            <div className="text-gray-400">
              <Link href="/privacy-policy" prefetch={true} className="text-purple-400 hover:text-purple-600 mr-4">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" prefetch={true} className="text-purple-400 hover:text-purple-600">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
