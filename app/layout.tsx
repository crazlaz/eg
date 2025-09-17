import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EG ELECTRIC — Fast, Professional Electricians in Charlotte, NC",
  description:
    "Same-day service. Up-front pricing. Licensed & insured electricians serving greater Charlotte.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
