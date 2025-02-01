"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import AuthButton from "./components/AuthButton";
import AirdropForm from "./components/AirdropForm";
import LoadingSpinner from "./components/LoadingSpinner";
import NotMemberMessage from "./components/NotMemberMessage";

export default function Airdrop() {
  const { data: session } = useSession();
  const [isMember, setIsMember] = useState(null);
  const [loading, setLoading] = useState(false); // For session and membership check
  const [airdropLoading, setAirdropLoading] = useState(false); // For airdrop claim
  const lastCheckedRef = useRef(null);

  useEffect(() => {
    if (session) {
      const now = Date.now();
      if (!lastCheckedRef.current || now - lastCheckedRef.current > 30000) { // 30 sec cooldown
        setLoading(true); // Show loading spinner for membership check
        lastCheckedRef.current = now;

        fetch(`/api/check-membership?accessToken=${session.accessToken}`)
          .then((res) => res.json())
          .then((data) => setIsMember(data.isMember))
          .catch((err) => console.error(err))
          .finally(() => setLoading(false)); // Hide spinner when finished
      }
    }
  }, [session]);

  const handleAirdropClaim = async (walletAddress, captchaToken) => {
    if (!session) return alert("Please log in with Discord first!");
    if (!isMember) return alert("You must join our Discord to claim the airdrop!");
    if (!captchaToken) return alert("Please complete the hCaptcha challenge!");

    setAirdropLoading(true); // Show loading spinner during airdrop claim

    const response = await fetch("/api/claim-airdrop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: walletAddress, captchaToken }),
    });

    const data = await response.json();
    setAirdropLoading(false); // Hide loading spinner once claim process is done

    if (data.success) {
      alert("Airdrop claimed successfully!");
    } else {
      alert("hCaptcha verification failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1c1e] text-gray-200">
      <Navbar />
      <div className="w-full max-w-md text-center p-6">
        <h1 className="text-4xl font-extrabold text-white">XENX Airdrop</h1>
        <p className="text-md text-gray-400 mt-3">
          Connect Discord and submit your wallet address to claim XENX tokens.
        </p>

        {session ? (
          loading ? ( // Show loading while checking membership
            <LoadingSpinner />
          ) : isMember === null ? null : isMember ? (
            airdropLoading ? ( // Show loading when claiming airdrop
              <LoadingSpinner />
            ) : (
              <AirdropForm onSubmit={handleAirdropClaim} />
            )
          ) : (
            <NotMemberMessage />
          )
        ) : (
          <AuthButton />
        )}
      </div>
    </div>
  );
}
