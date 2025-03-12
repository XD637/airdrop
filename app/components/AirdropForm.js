"use client";

import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function AirdropForm() {
  const { data: session } = useSession();
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    <div className="bg-white  shadow-1xl rounded-xl p-8 w-full max-w-lg mx-auto text-black border border-gray-200 backdrop-blur-lg">
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-6">
        <input
          type="text"
          placeholder="Enter your wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 w-full "
          required
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg w-2/3 mx-auto flex items-center justify-center transition duration-200 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? <ImSpinner2 className="animate-spin" size={20} /> : "Claim Airdrop"}
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full text-center text-black border border-gray-200">
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
              Your address has been noted. Due to high submissions, we will process the airdrop in bulk.
              If you did not receive tokens, please message your address in our Airdrop Discord channel.
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