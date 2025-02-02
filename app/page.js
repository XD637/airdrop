"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import AuthButton from "./components/AuthButton";
import AirdropForm from "./components/AirdropForm";
import LoadingSpinner from "./components/LoadingSpinner";
import NotMemberMessage from "./components/NotMemberMessage";
import Footer from "./components/Footer"; 

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
    <div className="min-h-screen flex flex-col bg-black/60 text-gray-200">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center w-full px-6 text-center ">
        <h1 className="text-4xl font-extrabold text-white">Airdrop</h1>
        <p className="text-md text-gray-400 mt-3">
          Connect Discord and submit your wallet address to claim 10 XENX tokens.
        </p>

        <div className="mt-6 ">
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
