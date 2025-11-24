import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "7-Day Mood Board",
  description: "Track your mood for 7 days of the week",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
