import "./globals.css";
import SessionWrapper from "./components/SessionWrapper"; // Import the wrapper

export const metadata = {
  title: "Xennium | Airdrop",
  description: "Claim your XENX tokens by connecting Discord.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
