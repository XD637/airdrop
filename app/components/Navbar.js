"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; // Import the spinner icon

export default function Navbar() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when logout is triggered
    await signOut(); // Call the signOut function
    setLoading(false); // Reset loading after logout completes
  };

  return (
    <nav className="w-full flex justify-between items-center p-6 bg-[#1c1c1e] text-white shadow-md fixed top-0 h-20 backdrop-blur-lg bg-opacity-30 border-b border-gray-300">
      <h1 className="text-lg font-bold">XENX Airdrop</h1>
      {!session ? (
        <button
          onClick={() => signIn("discord")}
          className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg flex items-center gap-2"
        >
          <FaDiscord size={18} /> Connect
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <p className="text-sm">{session.user.name}</p>
          <button
            onClick={handleLogout}
            className="text-purple-400 underline text-sm flex items-center gap-2"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <ImSpinner2 className="animate-spin text-purple-400" size={16} /> // Show spinner while loading
            ) : (
              "Logout"
            )}
          </button>
        </div>
      )}
    </nav>
  );
}
