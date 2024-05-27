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
        {/* creating two empty divs to create blurred color effect */}
        <div
          className="bg-[#A8A29E] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]
        dark:bg-[#8d8781]
        "
        ></div>
        <div
          className="bg-[#D6D3D1] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] 
        sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]
        dark:bg-[#868684]
        "
        ></div>
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
