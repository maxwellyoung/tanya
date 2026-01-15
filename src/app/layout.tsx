import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const authenticSans = localFont({
  src: "../../public/authentic-sans-60.otf",
  variable: "--font-authentic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Three Colours Red | Tanya Bardell-Young",
  description:
    "Colour Consulting & Interior Design by Tanya Bardell-Young. Harmonious Colors, Comforting Designs.",
  keywords: [
    "colour consulting",
    "interior design",
    "color consultant",
    "home design",
    "Tanya Bardell-Young",
  ],
  authors: [{ name: "Tanya Bardell-Young" }],
  openGraph: {
    title: "Three Colours Red | Tanya Bardell-Young",
    description:
      "Colour Consulting & Interior Design. Harmonious Colors, Comforting Designs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${authenticSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
