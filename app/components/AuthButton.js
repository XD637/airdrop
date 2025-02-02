"use client";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

export default function AuthButton() {
  return (
    <div className="flex justify-center">
      <button
        onClick={() => signIn("discord")}
        className="mt-6 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg flex items-center justify-center gap-3 hover:bg-purple-700"
      >
        <FaDiscord size={18} />
        <span>Connect Discord</span>
        <FaArrowRight size={16} />
      </button>
    </div>
  );
}
