"use client";

import { useState } from "react";

export default function NotMemberMessage() {
  const [showNote, setShowNote] = useState(false);

  const handleJoinClick = () => {
    window.open("https://discord.gg/DwpdM3nbvJ", "_blank");
    setShowNote(true);
  };

  return (
    <div className="mt-6 text-center bg-black/60 p-6 rounded-lg">
      <p className="text-purple-500 font-semibold">
        You must join our Discord to claim the airdrop!
      </p>
      <button
        onClick={handleJoinClick}
        className="mt-4 px-4 py-2 bg-purple-600 text-white font-bold rounded-lg inline-block"
      >
        Join Discord
      </button>
      {showNote && (
        <p className="mt-4 text-sm text-gray-400">
          If you&apos;re joined, please refresh this page...
        </p>
      )}
    </div>
  );
}
