"use client"; //motion uses useState react hook that requires client side rendering

import React from "react";
import { motion } from "framer-motion"; //library that allows you to animate elements in your site
import { links } from "@/lib/data"; //importing link data we have in data.ts
import Link from "next/link"; //automatic import for using link react component
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

//built in header component from react
export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext(); //using our custom hook to get the active section
  return (
    //z index and relative are tailwind css classes. check docs
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"
        //how to animate our header div using motion
        initial={{ y: -100, x: "-50%", opacity: 0 }} //initial state before the animation
        animate={{ y: 0, x: "-50%", opacity: 1 }} //animation itself. header goes from -100 vertically back to default
        id="header"
      ></motion.div>

      <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-[#78716C] sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {links.map(
            //find out what this function does. i think link react component converts the objects in the array into routes for the site
            (link) => (
              <motion.li
                className="h-3/4 flex items-center justify-center relative"
                key={link.hash}
                initial={{ y: -100, opacity: 0 }} //initial state before the animation
                animate={{ y: 0, opacity: 1 }} //animation itself. header goes from -100 vertically back to default
              >
                <Link
                  className={clsx(
                    "flex w-full items-center justify-center px-3 py-3 hover:text-[#1C1917] transition",
                    {
                      //clsx makes links gray 950 when activeSection is equal to what page we are on
                      "text-gray-950": activeSection === link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }} //sets activesection to what link we click on in the header
                >
                  {link.name === activeSection && (
                    <motion.span
                      className="bg-gray-200 rounded-full absolute inset-0 -z-10"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}

                  {link.name}
                </Link>
              </motion.li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}
