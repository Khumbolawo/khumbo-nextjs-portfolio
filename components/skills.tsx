"use client";
import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  //framer motion shenanigans
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    //advanced framer motion tech
    //takes the index of the list as input
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index, //this line creates the staggered animation in the skills list
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  return (
    <section
      ref={ref}
      id="skills"
      className="max-w-[53rem] scroll-mt-28 text-center sm:mb-2"
    >
      <SectionHeading>My Skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skillsData.map((skill, index) => (
          <motion.li
            className="bg-white borderBlack rounded-xl px-5 py-3"
            key={index}
            variants={fadeInAnimationVariants}
            initial={"initial"}
            whileInView={"animate"} //this is how you make the animation only happen once the user scrolls to the section.
            viewport={{
              //viewport is a framer motion feature that allows you to animate the animation based on the viewport size.
              //In this create im using it to make the animation only happen once the user scrolls to the section.
              once: true,
            }}
            custom={index} //code to customize the animation based on the index of the list we are currently mapping to
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
