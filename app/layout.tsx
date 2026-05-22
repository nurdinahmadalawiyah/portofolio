import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scrollToTop";
import SmoothScroll from "@/components/smoothScroll";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.home.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased selection:bg-turquoise selection:text-black">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "system", enableSystem: true, storageKey: "portofolio-theme" }}>
          {/* Global Ambient Glows */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-turquoise/20 rounded-full blur-[120px] animate-glow-1" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-turquoise/10 rounded-full blur-[120px] animate-glow-2" />
          </div>
          
          <Navbar />
          <ScrollToTop />
          <SmoothScroll>
            <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
              <main className="container mx-auto max-w-6xl pt-16 px-4 flex-grow">
                {children}
                <Analytics />
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
