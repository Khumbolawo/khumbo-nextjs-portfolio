import type { Metadata } from "next";
{
  /* curly braces necessary for non default imports*/
}
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khumbolawo | Portfolio",
  description: "Khumbo is a try hard that doesnt actually know jackshit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      {/* styling main body colors and fonts from Inter font family  */}
      <body
        className={`${inter.className} bg-[#E7E5E4] text-gray-950 relative pt-28 sm:pt-36
        dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90
        `}
      >
        {/* this is the context provider for the theme, which is used to change the color scheme of the website*/}
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            {" "}
            {/* this is the context provider for the active section, which is used to highlight the nav bar section that the user is currently on*/}
            <Header />
            {children}
            <Footer />
            <Toaster position="top-right" />
          </ActiveSectionContextProvider>

          <ThemeSwitch />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
