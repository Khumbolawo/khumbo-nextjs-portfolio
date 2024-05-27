"use client";
import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About"); //custom hook we are using to set the current active section for our nav bar animations

  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28" //scroll-mt- adds margin when you navigate to about
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.175,
      }}
      id="about"
      ref={ref}
    >
      <SectionHeading>About Me</SectionHeading>{" "}
      {/*this is how you pass in About me as a child to sectionheading
      .now the section heading is a reusable component
      */}
      <p>
        I started attempting to learn to code more than a few years ago. I
        cannot say I've discovered the best way to approach the field as of yet,
        but I have a willingness to learn and will keep trying.
      </p>
      <p>
        When I'm not trying and failing to code, I play video games, watch pc
        hardware videos online and other stuff I don't feel like talking about
        here because lol.
      </p>
    </motion.section>
  );
}
