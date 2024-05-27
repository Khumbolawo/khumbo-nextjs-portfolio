"use client";
import React from "react";
import SectionHeading from "./section-heading";
import Project from "./project";
import { projectsData } from "@/lib/data"; //imported hardcoded project data entries from our data.ts. This is probably what importing from a database would look like
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  return (
    <div className="mb-28 scroll-mt-28" ref={ref} id="projects">
      <SectionHeading> My Projects</SectionHeading>
      <h1> Projects are still WIP lol</h1>
    </div>
    // <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
    //   <SectionHeading> My Projects</SectionHeading>
    //   <div>
    //     {projectsData.map((project, index) => (
    //       <React.Fragment key={index}>
    //         {" "}
    //         {/*this is how you create a key for every project*/}
    //         <Project {...project}></Project>
    //       </React.Fragment>
    //     ))}
    //   </div>
    // </section>
  );
}
