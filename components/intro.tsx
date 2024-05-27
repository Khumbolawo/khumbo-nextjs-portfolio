"use client"; //framer motion requires client side rendering

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsGithub } from "react-icons/bs"; //react arrow icon
import { HiDownload } from "react-icons/hi"; //react download icon
import { BsLinkedin } from "react-icons/bs"; //react linkedin icon
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      {/* picture of me */}
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }} //animating the picture
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.5,
          }}
        >
          <div className="relative">
            <Image //adding an image component with some tailwind styles
              src="/khumbolawo-profilepic1_cropped.png"
              alt="Khumbo portrait"
              width={200}
              height={200}
              quality="95"
              priority={true}
              className="rounded-full h-24 w-24 object-cover border-[0.35rem] border-white shadow-x1"
            />
          </div>
        </motion.div>
      </div>
      {/* intro text */}
      <motion.p
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Hello, I'm <span className="font-bold"> Khumbo.</span> I'm trying to be
        a <span className="font-bold">full-stack developer.</span> I loathe
        building <span className="italic">sites & apps</span>. My focus is for
        now <span className="underline">React (Next.js)</span>.
      </motion.p>

      {/* contact and social media links */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.5,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 items-center flex gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105
          transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-50 group-hover:translate-x-1 transition" />{" "}
        </Link>
        <a
          href="/CV.pdf"
          download
          className="group bg-white px-7 py-3 items-center flex gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105
          transition cursor-pointer borderBlack dark:bg-white/10"
        >
          Download CV{" "}
          <HiDownload className="opacity-50 group-hover:translate-y-1 transition " />{" "}
        </a>
        <a
          href="#"
          className="text-gray-700 bg-white p-4 items-center flex gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 hover:text-gray-950
          transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
        >
          {" "}
          <BsLinkedin />{" "}
        </a>
        <a
          href="https://github.com/khumbolawo"
          className="text-gray-700 bg-white p-4 items-center flex gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 hover:text-gray-950
          transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
        >
          {" "}
          <BsGithub />{" "}
        </a>
      </motion.div>
    </section>
  );
}
