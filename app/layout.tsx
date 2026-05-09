import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "OC Bin Broker | Dumpster Rentals Made Easy in Orange County",
  description: "Fast, transparent dumpster rental quotes through our trusted Orange County hauler network."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold text-brand-700">OC Bin Broker</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/quote">Get Quote</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
