"use client";
import React, { useEffect } from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { projectsData } from "@/lib/data"; //imported hardcoded project data entries from our data.ts. This is probably what importing from a database would look like
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.5, //when 50% of the section is in the viewport, the inView variable will be true
  }); //custom hook given to us by react-intersection-observer package. updates inView variable when this section comes into view in the viewport
  //inView variable is a bool we can now use to setactivesection to true when this component comes into view
  const { setActiveSection } = useActiveSectionContext(); //collecting the setter from the context provider
  useEffect(() => {
    //wrap function in useEffect as best practice. dont really know what useeffect does yet
    if (inView) {
      setActiveSection("Projects");
    }
  }, [inView, setActiveSection]);
  return (
    <section ref={ref} id="projects" className="scroll-mt-28">
      <SectionHeading> My Projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            {" "}
            {/*this is how you create a key for every project*/}
            <Project {...project}></Project>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
