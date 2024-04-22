//refactored to reduce the amount of client side rendering neccessary
"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, transform } from "framer-motion";

type ProjectProps = (typeof projectsData)[number]; //type alias for projectsData[0]. need to understand props better

export default function Project({
  title,
  description,
  tags,
  imageUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null); //not sure what this is doing
  //scrollYProgress is a variable we will use to track the progress of scrolling vertically on the page to control the animation
  const { scrollYProgress } = useScroll({
    //this is a framer motion element
    target: ref, //this is the element that we want to scroll to
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]); //motion hook to let us control scrollprogress
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]); //motion hook to let us control scrollprogress
  //separate component for every individual project
  return (
    <motion.div //wrapping section inside of a motion div instead makes the animation smoother somehow
      ref={ref}
      style={{
        scale: scaleProgress, //this is the animation that we want to use to scroll to the next section
        opacity: opacityProgress,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section
        className=" bg-gray-250 max-w-[42rem] border border-black/5 overflow-hidden sm:pr-8 relative sm:h-[20rem] mb-3 sm:mb-8 last:mb-0 rounded-lg group-even:pl-8 
      hover:bg-gray-300 transition
      "
      >
        <div className="[pt-4 pb-7 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full group-even:ml-[18rem]">
          {" "}
          {/* div containing all our text to make it easier to use flexbox and align the text with images in this section  */}
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700">{description}</p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map(
              (
                tag,
                index //need to understand mapping better too
              ) => (
                <li
                  className="bg-black/[0.7] px-3 tracking-wider text-white rounded-full"
                  key={index}
                >
                  {tag}
                </li>
              )
            )}
          </ul>
        </div>

        <Image
          src={imageUrl}
          alt={title}
          quality={95}
          className="absolute top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl 
          
          group-even:right-[initial] 
          group-even:-left-40
          group-hover:scale-[1.04] 
          
          group-hover:-translate-x-3 
          group-hover:translate-y-3 
          group-hover:-rotate-2 transition
          
          group-even:group-hover:translate-x-3 
          group-even:group-hover:translate-y-3 
          group-even:group-hover:rotate-2
          "
        />
      </section>
    </motion.div>
  );
}
