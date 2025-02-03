"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Head from "next/head"; // SEO
import Image from "next/image"; // For optimized image handling
import Navbar from "./components/Navbar";
import AuthButton from "./components/AuthButton";
import AirdropForm from "./components/AirdropForm";
import LoadingSpinner from "./components/LoadingSpinner";
import NotMemberMessage from "./components/NotMemberMessage";
import Footer from "./components/Footer";
import Link from "next/link"; // Import Link from next/link

export default function Airdrop() {
  const { data: session } = useSession();
  const [isMember, setIsMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [airdropLoading, setAirdropLoading] = useState(false);
  const lastCheckedRef = useRef(null);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

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
          content="Xennium, XENX, airdrop, free crypto, blockchain, crypto rewards"
        />
        <meta name="author" content="Xennium Team" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Xennium Airdrop - Claim Free XENX Tokens" />
        <meta
          property="og:description"
          content="Claim your free XENX tokens! Connect Discord and submit your wallet to receive 10 XENX tokens instantly."
        />
        <meta property="og:image" content="/images/airdrop-banner.webp" />
        <meta property="og:url" content="https://airdrop.xennium.org" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Xennium Airdrop - Claim Free XENX Tokens" />
        <meta
          name="twitter:description"
          content="Claim your free XENX tokens! Connect Discord and submit your wallet to receive 10 XENX tokens instantly."
        />
        <meta name="twitter:image" content="/images/airdrop-banner.webp" />
        <meta name="twitter:site" content="@Xenniumx" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://airdrop.xennium.org" />
      </Head>

      <div className="min-h-screen flex flex-col bg-black/60 text-gray-200">
        <Navbar />

        <main className="flex-grow flex flex-col items-center justify-center w-full px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white">XENX AIRDROP</h1>
          <p className="text-md text-gray-400 mt-3">
            Connect Discord and submit your wallet address to claim 10 XENX tokens.
          </p>

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
          <div className="mt-6 text-center">
  {/* Add Privacy Policy and Terms & Conditions links */}
  <div className="text-gray-400">
    <Link href="/privacy-policy" className="text-purple-400 hover:text-purple-600 mr-4">Privacy Policy</Link>
    <Link href="/terms-and-conditions" className="text-purple-400 hover:text-purple-600">Terms & Conditions</Link>
  </div>
</div>
        </main>

        <Footer />
      </div>
    </>
  );
}
