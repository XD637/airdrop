"use client";



export default function NotMemberMessage() {

  const handleJoinClick = () => {
    window.open("https://discord.com/invite/7KmMBrrJEz", "_blank");
  };

  return (
    <div className="mt-6 text-center bg-gray-100 text-black p-6 rounded-lg">
      <p className="text-purple-500 font-semibold">
        You must join our Discord to claim the airdrop!
      </p>
      <button
        onClick={handleJoinClick}
        className="mt-4 px-4 py-2 bg-purple-600 text-white font-bold rounded-lg inline-block"
      >
        Join Discord
      </button>
     
        <p className="mt-4 text-sm font-semibold text-gray-700">
         Important Note: After joining, please refresh this page!
        </p>
    </div>
  );
}
