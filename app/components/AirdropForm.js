"use client";

import { useSession } from "next-auth/react";
import { useState, useRef, useCallback } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ImSpinner2 } from "react-icons/im";

export default function AirdropForm() {
  const { data: session } = useSession();
  const [walletAddress, setWalletAddress] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const hcaptchaSiteKey = useRef(process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY).current;
  const hcaptchaRef = useRef(null);  // Ref to prevent multiple instances

  const isValidWalletAddress = useCallback(
    (address) => /^0x[a-fA-F0-9]{40}$/.test(address),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidWalletAddress(walletAddress)) {
      setError("Please enter a valid wallet address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/saveAddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          discordUsername: session?.user?.name,
          walletAddress,
        }),
      });

      if (res.status === 409) {
        setError("This wallet address, Discord username, or email is already claimed.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error((await res.json()).message || "Failed to save address");
      }

      setShowModal(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  return (
    <div className="bg-black/60 p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6 ">
        <input
          type="text"
          placeholder="Enter your wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-600 w-full"
          required
        />
        {error && <p className="text-purple-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-center">
          <HCaptcha
            sitekey={hcaptchaSiteKey}
            onVerify={setCaptchaToken}
            ref={hcaptchaRef} // Ref to prevent multiple instances
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg w-2/3 mx-auto flex items-center justify-center transition duration-200 disabled:bg-gray-500"
          disabled={loading || !captchaToken}
        >
          {loading ? <ImSpinner2 className="animate-spin" size={20} /> : "Claim Airdrop"}
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-black/80 p-6 rounded-lg shadow-lg max-w-md w-full text-center text-white">
            <svg
              className="mx-auto text-purple-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="50"
              height="50"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-lg font-semibold">Success!</h2>
            <p className="text-sm mt-2">
              Your address has been noted down. Due to the high volume of submissions, we&apos;ll process the airdrop in bulk.
              If you don&apos;t receive your tokens, please message your address in our Airdrop Discord channel.
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
