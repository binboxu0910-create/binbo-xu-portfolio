import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://binbo-xu-analyst.binboxu0910.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Binbo Xu | Business Analytics Portfolio",
  description: "Selected business analytics, decision modeling, and data science work by Binbo Xu.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Binbo Xu | Business Analytics Portfolio",
    description: "Business analytics, decision modeling, and data science projects.",
    type: "website",
    url: siteUrl,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Binbo Xu business analytics portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binbo Xu | Business Analytics Portfolio",
    description: "Business analytics, decision modeling, and data science projects.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
