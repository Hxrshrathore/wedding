import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata with a feature image
export const metadata: Metadata = {
  title: "Wedding Invitation - Shrishty & Vikash",
  description: "Join us in celebrating the wedding of Shrishty & Vikash. Discover their story and the event details.",
  openGraph: {
    title: "Shrishty & Vikash's Wedding",
    description: "A beautiful invitation to celebrate the union of Shrishty & Vikash.",
    url: "https://your-website-url.com",
    images: [
      {
        url: "/path-to-couple-image-1.jpg", // Path to your feature image
        width: 1200,
        height: 630,
        alt: "Wedding Invitation - Shrishty & Vikash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shrishty & Vikash's Wedding",
    description: "A beautiful invitation to celebrate the union of Shrishty & Vikash.",
    images: ["/path-to-couple-image-1.jpg"], // Path to your feature image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add any additional meta tags or links here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Render the page's main content */}
        {children}
      </body>
    </html>
  );
}
