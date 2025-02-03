"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaDiscord, FaCube } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollingDown(window.scrollY > prevScrollY);
      setPrevScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-10 py-6 z-50 backdrop-blur-lg bg-black/60 text-white border-b border-gray-700 transition-transform duration-300 ${
        scrollingDown ? "-translate-y-24" : "translate-y-0"
      }`}
      style={{ height: "90px" }} // Taller navbar
    >
      <div className="text-3xl font-extrabold">
        <Link href="/">XENX AIRDROP</Link>
      </div>

      <div className="flex items-center gap-8">
        <Link
          href="https://polygonscan.com/token/0x0f29965ca5f1111b073efa37a739dd2fafab11e0"
          aria-label="View the Xennium token on PolygonScan"
          target="_blank"
          className="text-purple-400"

        >
          <FaCube size={24} />
        </Link>

        {!session ? (
          <button
            onClick={() => signIn("discord")}
            className="px-5 py-2 bg-purple-600 text-white font-bold rounded-lg flex items-center gap-2 text-lg"
          >
            <FaDiscord size={20} /> Connect
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="text-purple-400 text-md flex items-center gap-2"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin" size={18} /> : "Logout"}
          </button>
        )}
      </div>
    </nav>
  );
}
